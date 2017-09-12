import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'body': {
    'backgroundImage': 'url("../images/background1.jpg")',
    'paddingTop': [{ 'unit': 'rem', 'value': 5 }]
  },
  '#container-content': {
    'width': [{ 'unit': 'px', 'value': 800 }],
    'backgroundColor': 'white'
  },
  'float-left': {
    'float': 'left'
  },
  '#channel-list>active': {
    'backgroundColor': 'red'
  },
  '#channel-list>a': {
    'backgroundColor': 'dimgray',
    'height': [{ 'unit': 'px', 'value': 33 }],
    'color': '#fff',
    'borderRadius': '0'
  },
  '#channel-list>list-group-item': {
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 1 }]
  },
  'player': {
    'marginTop': [{ 'unit': 'px', 'value': 10 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  'social-icons': {
    'margin': [{ 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': -10 }],
    'display': 'inline-block',
    'width': [{ 'unit': '%H', 'value': 0.1 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'only screen&&<w768': {
      'display': 'none'
    }
  },
  'social-icons img': {
    'width': [{ 'unit': 'px', 'value': 40 }],
    'height': [{ 'unit': 'px', 'value': 40 }]
  },
  'social-icons li': {
    'listStyle': 'none',
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
  },
  'social-icons span': {
    'color': 'white'
  },
  'social-icons logo': {
    'width': [{ 'unit': 'px', 'value': 50 }],
    'height': [{ 'unit': 'px', 'value': 50 }],
    'marginBottom': [{ 'unit': 'px', 'value': 20 }]
  },
  // Responsive Changes
});
