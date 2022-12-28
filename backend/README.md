1. conda 创建虚拟环境，python3 系列应该都行
2. 安装必要的包

   `pip install -r requirements.txt`

3. 启动

   `flask run`

4. API

- 表格数据：http://127.0.0.1:5000/get_data

  输入：
  {"file_name": "charity.csv"}

  输出
  {
  "dimensions": [
  {
  "dim": 0,
  "name": "TangibilityCondition"
  }
  ],
  "values": [
  [
  1.0,
  0.0,
  7.0,
  4.0,
  4.5
  ]
  ]
  }

- 降维数据：http://127.0.0.1:5000/get_dim_reduction

  输出：
  [
  [
  -15.52724552154541,
  -20.15583610534668
  ],
  [
  23.686649322509766,
  -39.90515899658203
  ]
  ]

- 因果图：http://127.0.0.1:5000/get_graph

  输入
  {"selected_id": [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92]}

  输出：

  {
  "links": [
  {
  "source": "0",
  "target": "2"
  }
  ],
  "nodes": [
  {
  "id": "1",
  "name": "AmountDonated"
  }
  ]
  }

- 不确定性排名：http://127.0.0.1:5000/get_uncertainty_rank

  输出

  [
  {
  "score": 34.27696345869017,
  "source": "2",
  "source_type": "categorical",
  "target": "4",
  "target_type": "numerical"
  }
  ]
