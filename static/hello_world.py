from sklearn.cluster import AgglomerativeClustering
from sklearn.datasets import load_iris
import numpy as np

from js import n_clusters, metric, linkage

X = np.array([[1, 2], [1, 4], [1, 0],
              [4, 2], [4, 4], [4, 0]])
iris = load_iris()
X = iris.data
print('parameters', n_clusters, metric, linkage)
try:
    clustering = AgglomerativeClustering(
                    n_clusters=n_clusters, 
                    metric=metric,
                    linkage=linkage,
                    compute_distances=True
                ).fit(X)
except Exception:
    print('Could not create clustering')

print('finished clustering', X.shape)
print('children', clustering.children_)
results = {
    'data': X,
    'labels': clustering.labels_,
    'children': clustering.children_,
    'distances': clustering.distances_
}

print('created results')