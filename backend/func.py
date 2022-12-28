from causallearn.search.ScoreBased.GES import ges
import pandas as pd

# Visualization using pydot
from causallearn.utils.GraphUtils import GraphUtils
import matplotlib.image as mpimg
import matplotlib.pyplot as plt
import io
import pydot

import numpy as np
from sklearn.manifold import TSNE

from causallearn.score.LocalScoreFunction import local_score_cv_general

graph_data = {}
data = pd.DataFrame()
id2name = {}
X = np.empty(1)
selected_X = np.empty(1)

def original_data(params):
    global data
    global id2name

    file_name = params['file_name']
    data_dir = "dataset/" + file_name
    print(data_dir)
    data = pd.read_csv(data_dir)

    id = 0
    for col in data.columns:
        # print(col)
        id2name[str(id)] = col
        id += 1

    dimensions = []
    id = 0
    for col in data.columns:
        dimensions.append({"dim": id, "name": col})
        id += 1

    values = data.values.tolist()

    table_data = {
        "dimensions": dimensions,
        "values": values
    }

    return table_data


def dim_reduction():
    arr = data.to_numpy()
    arr_embedded = TSNE(n_components=2, learning_rate='auto',
                        init='random', perplexity=3).fit_transform(arr)
    return arr_embedded.tolist()


def causal_graph(params):
    global graph_data
    global X
    global selected_X

    
    selected_id = params['selected_id']
    print(selected_id)
    X = data.to_numpy()
    print(len(X))
    selected_X = X.take(selected_id, axis=0)
    print(len(selected_X))

    Record = ges(selected_X, 'local_score_CV_general')
    pyd = GraphUtils.to_pydot(Record['G'])

    edge_list = pyd.get_edges()
    node_id_set = set()
    for n in pyd.get_nodes():
        node_id_set.add(n.get_name())

    node_list = []
    for id in node_id_set:
        node_list.append({"id": id, "name": id2name[id]})

    links_list = []
    for e in edge_list:
        links_list.append({"source": str(e.get_source()),
                          "target": str(e.get_destination())})

    graph_data["nodes"] = node_list
    graph_data["links"] = links_list
    # graph_data = {
    #     "nodes": node_list,
    #     "links": links_list
    # }

    return graph_data


def uncertainty_rank():
    # global selected_X

    print(graph_data)
    print(len(selected_X))
    
    uncertainty_list = []
    for e in graph_data['links']:
        score = local_score_cv_general(selected_X, int(e['target']), [int(e['source'])], parameters={"kfold": 10, "lambda": 0.01})
        uncertainty_list.append({
            "source": e['source'],
            "target": e['target'],
            "score": score
        })
    newlist = sorted(uncertainty_list, key=lambda d: d['score'])
    return newlist


