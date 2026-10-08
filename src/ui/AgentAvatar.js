// @ts-nocheck
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { agentIcons } from '../assets/icons.js';
export function AgentAvatar({agentId,size=36}) { return <View style={[styles.wrap,{width:size,height:size,borderRadius:size/2}]}><Text style={{fontSize:size*0.55}}>{agentIcons[agentId]}</Text></View>; }
const styles=StyleSheet.create({wrap:{backgroundColor:'#fff1e8',alignItems:'center',justifyContent:'center'}});
