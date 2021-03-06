import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'body': {
    'backgroundImage': 'url("../images/background1.jpg")',
    'paddingTop': [{ 'unit': 'rem', 'value': 5 }]
  },
  'float-left': {
    'float': 'left'
  },
  'player': {
    'marginTop': [{ 'unit': 'px', 'value': 10 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'width': [{ 'unit': '%H', 'value': 0.88 }]
  },
  '#channel-list': {
    'marginTop': [{ 'unit': 'px', 'value': 10 }]
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
