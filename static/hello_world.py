from sklearn.cluster import AgglomerativeClustering
from sklearn.datasets import load_iris
import numpy as np

X = np.array([[1, 2], [1, 4], [1, 0],
              [4, 2], [4, 4], [4, 0]])
iris = load_iris()
X = iris.data
clustering = AgglomerativeClustering().fit(X)
labels = clustering.labels_

result = {'label': clustering.labels_}

print('hello world', result)