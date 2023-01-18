import { setDimensions, setValues, setDimData, setGraph, setRanks, setSelectIds } from './features/data/dataSlice'

const requireGetData = async (dispatch, filename) => {
  filename = filename.concat(".csv");
  try {
    const dataResponse = await fetch("/get_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file_name: filename }),
    });
    const dataJson = await dataResponse.json();
    dispatch(setDimensions(dataJson.dimensions))
    dispatch(setValues(dataJson.values))
    let selected_ids = []
    for (let i in dataJson.values) {
      selected_ids.push(+i)
    }
    dispatch(setSelectIds(selected_ids))
    return {
      code: 200
    }
  } catch (error) {
    dispatch(setDimensions([]))
    dispatch(setValues([]))
    dispatch(setSelectIds([]))
    return {
      code: 500
    }
  }
}

const requireGetDimReduction = async (dispatch) => {
  try {
    const dimReductionResponse = await fetch(
      "/get_dim_reduction",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const dimReductionJson = await dimReductionResponse.json();
    dispatch(setDimData(dimReductionJson))
    return {
      code: 200
    }
  } catch (error) {
    dispatch(setDimData([]))
    return {
      code: 500
    }
  }
}

const requireGetGraph = async (dispatch, selected_ids) => {
  try {
    const graphResponse = await fetch("/get_graph", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selected_id: selected_ids,
      }),
    });
    const graphJson = await graphResponse.json();
    return {
      code: 200,
      graph: graphJson
    }
  } catch (error) {
    dispatch(setGraph({
      links: [],
      nodes: []
    }))
    return {
      code: 500
    }
  }
}

const requireGetRank = async (dispatch) => {
  try {
    const rankResponse = await fetch(
      "/get_uncertainty_rank",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const rankJson = await rankResponse.json();
    dispatch(setRanks(rankJson))
    return {
      code: 200
    }
  } catch (error) {
    dispatch(setRanks([]))
    return {
      code: 500
    }
  }
}

export {requireGetData, requireGetDimReduction, requireGetGraph, requireGetRank}