from flask import Flask, request, jsonify
from func import causal_graph, uncertainty_rank, original_data, dim_reduction
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.route("/")
def get_hello():
    return "<p>Hello, World!</p>"


@app.route("/get_data", methods=["POST"])
def get_data():
    params = request.get_json() if request.method == "POST" else request.args
    print(params)
    res = original_data(params)
    return jsonify(res)


@app.route("/get_dim_reduction", methods=["POST"])
def get_dim_reduction():
    # params = request.get_json() if request.method == "POST" else request.args
    res = dim_reduction()
    return jsonify(res)


@app.route("/get_graph", methods=["POST"])
def get_graph():
    params = request.get_json() if request.method == "POST" else request.args
    res = causal_graph(params)
    return jsonify(res)


@app.route("/get_uncertainty_rank", methods=["POST"])
def get_uncertainty_rank():
    # params = request.get_json() if request.method == "POST" else request.args
    res = uncertainty_rank()
    return jsonify(res)
