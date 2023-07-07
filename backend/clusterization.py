import numpy as np
import pandas as pd
from kmodes.kprototypes import KPrototypes
from sklearn.cluster import DBSCAN, Birch
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import LabelEncoder

def prepare_kmodes_data(data):
	catColumnsPos = [data.columns.get_loc(col) for col in list(data.select_dtypes('object').columns)]

	d = data.apply(lambda x: x.fillna(x.mean()) if x.dtype.kind in 'biufc' else x.fillna('.'))

	print("data preparada")
	return d, catColumnsPos

def prepare_dbscan_data(data):
	df_encoded = data.copy()
	df_encoded = df_encoded.apply(lambda x: x.fillna(x.mean()) if x.dtype.kind in 'biufc' else x.fillna('.'))
	label_encoder = LabelEncoder()

	for col in df_encoded.columns:
			if df_encoded[col].dtype == 'object':
					df_encoded[col] = label_encoder.fit_transform(df_encoded[col].astype(str))

	scaler = StandardScaler()
	scaled_values = scaler.fit_transform(df_encoded)
	df_scaled = pd.DataFrame(scaled_values, columns=df_encoded.columns)

	return df_scaled

# particionamento
def run_kmodes(data, init='Huang', n_clusters=4, verbose=3):
	d, catColumnsPos = prepare_kmodes_data(data)

	kmodes_model = KPrototypes(n_clusters=n_clusters, init=init, n_init=1, verbose=verbose)

	print("running kmodes")

	clusters = kmodes_model.fit_predict(d, categorical = catColumnsPos)
	print(kmodes_model.cluster_centroids_)
	data['grupo'] = kmodes_model.labels_

# densidade
def run_dbscan(data, eps=3, min_samples=2):
	df_scaled = prepare_dbscan_data(data)

	dbscan_model = DBSCAN(eps=0.3, min_samples=5)
	dbscan_model.fit(df_scaled)		
	
	print(dbscan_model.labels_)
	data['grupo'] = dbscan_model.labels_

# hierarquico
def run_birch(data, eps=3, min_samples=2):
	df_scaled = prepare_dbscan_data(data)

	birch_model = Birch(n_clusters=None)
	birch_model.fit(df_scaled)
	birch_model.predict(df_scaled)

	print(birch_model.labels_)
	data['grupo'] = birch_model.labels_
