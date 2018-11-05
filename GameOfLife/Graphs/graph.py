import json

from graphviz import Digraph

with open('4x4Dif.json', 'r') as f:
    nodes_dict = json.load(f)

f = Digraph('finite_state_machine', filename='fsm.gv', engine='sfdp')
f.attr('node', shape='circle')

for edge in nodes_dict['edges']:
    data = edge['data']
    source = data['source']
    target = data['target']
    f.edge(source, target)

f.view()
