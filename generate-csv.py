import csv
import random

# 14000000 and 106 == roughly 14GB (WARNING TAKES a while, 30s+)
rows = 14000000
columns = 106

def generate_random_row(col):
    a = []
    l = [i]
    for j in range(col):
        l.append(random.random())
    a.append(l)
    return a

if __name__ == '__main__':
    f = open('sample.csv', 'w')
    w = csv.writer(f, lineterminator='\n')
    for i in range(rows):
        w.writerows(generate_random_row(columns))
    f.close()