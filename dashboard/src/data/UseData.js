import { useEffect,useState } from "react";
import {csv} from "d3-fetch";
const csvUrl  = "https://gist.githubusercontent.com/Maurice-1235/10bcb2c9d71d4609431522b9905ed547/raw/5f696b5883a1aa0e291a38f3ff68fdab00f675d7/mushroom.csv";
export const useData = () =>{

    const [data, setData] = useState(null);

    useEffect(() => {

      csv(csvUrl).then((data) => {
        // setData(data.slice(0, 10));
        console.log(data)
      });
    }, []);
    return data;
  }