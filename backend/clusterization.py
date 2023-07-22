import pandas as pd
from kmodes.kprototypes import KPrototypes
from sklearn.cluster import DBSCAN, Birch
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import LabelEncoder

def add_labels_to_table_view(table_view, labels):
    table_view["columns"].append(
        {'value': 'cluster', 'label': "Cluster", 'type': 'number'})

    i = 0
    for row in table_view["rows"]:
        row["cluster"] = str(labels[i])
        i = i + 1

    return table_view


def prepare_kmodes_data(data):
    catColumnsPos = [data.columns.get_loc(col) for col in list(
        data.select_dtypes('object').columns)]

    d = data.apply(lambda x: x.fillna(x.mean())
                   if x.dtype.kind in 'biufc' else x.fillna('.'))

    return d, catColumnsPos


def prepare_mixed_data(data):
    df_encoded = data.copy()
    df_encoded = df_encoded.apply(lambda x: x.fillna(
        x.mean()) if x.dtype.kind in 'biufc' else x.fillna('.'))
    label_encoder = LabelEncoder()

    for col in df_encoded.columns:
        if df_encoded[col].dtype == 'object':
            df_encoded[col] = label_encoder.fit_transform(
                df_encoded[col].astype(str))

    scaler = StandardScaler()
    scaled_values = scaler.fit_transform(df_encoded)
    df_scaled = pd.DataFrame(scaled_values, columns=df_encoded.columns)

    return df_scaled

# particionamento
def run_kmodes(data, table_view, init='Huang', n_clusters=3, n_init=3):
    d, catColumnsPos = prepare_kmodes_data(data)

    kmodes_model = KPrototypes(n_clusters=n_clusters, init=init, n_init=n_init)
    clusters = kmodes_model.fit_predict(d, categorical=catColumnsPos)

    return add_labels_to_table_view(table_view, kmodes_model.labels_)

# densidade
def run_dbscan(data, table_view, eps=3, min_samples=2):
    df_scaled = prepare_mixed_data(data)

    dbscan_model = DBSCAN(eps=eps, min_samples=min_samples)
    dbscan_model.fit(df_scaled)

    return add_labels_to_table_view(table_view, dbscan_model.labels_)

# hierarquico
def run_birch(data, table_view, n_clusters=3, threshold=0.5, branching_factor=50):
    df_scaled = prepare_mixed_data(data)

    birch_model = Birch(n_clusters=n_clusters,
                        threshold=threshold, branching_factor=branching_factor)
    birch_model.fit(df_scaled)
    birch_model.predict(df_scaled)

    return add_labels_to_table_view(table_view, birch_model.labels_)


def cluster_data(clusterization_method='none', data=None, table_view=None, parameters=None):
    if (clusterization_method == 'kmodes'):
        print(parameters["init"], parameters["n_clusters"],
              parameters["n_init"])
        return run_kmodes(data, table_view, parameters["init"], parameters["n_clusters"], parameters["n_init"])
    elif (clusterization_method == 'dbscan'):
        print(parameters["eps"], parameters["min_samples"])
        return run_dbscan(data, table_view, float(parameters["eps"]), parameters["min_samples"])
    elif (clusterization_method == 'birch'):
        print(parameters["n_clusters"], parameters["threshold"], parameters["branching_factor"])
        return run_birch(data, table_view, parameters["n_clusters"], float(parameters["threshold"]), parameters["branching_factor"])
    return table_view
