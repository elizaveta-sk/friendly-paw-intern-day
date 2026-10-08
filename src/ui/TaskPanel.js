// @ts-nocheck
import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
export function TaskPanel({task}) { return <View style={s.card}><View style={s.head}><Text style={s.kicker}>ASSIGNMENT</Text><Text style={s.status}>{task.status.replace('_',' ')}</Text></View><Text style={s.title}>FP-142 · Pet birthday treats</Text><Text style={s.copy}>{task.description}</Text><Text style={s.ambiguity}>Clarified: {task.discoveredAmbiguities.length}/4 ambiguities</Text></View>; }
const s=StyleSheet.create({card:{backgroundColor:'#f1f6ef',borderRadius:14,padding:14,margin:12},head:{flexDirection:'row',justifyContent:'space-between'},kicker:{fontSize:10,fontWeight:'800',letterSpacing:1,color:'#578061'},status:{fontSize:11,fontWeight:'700',color:'#578061'},title:{fontWeight:'800',fontSize:15,color:'#25352c',marginTop:7},copy:{fontSize:12,lineHeight:17,color:'#526057',marginTop:6},ambiguity:{fontSize:12,fontWeight:'700',color:'#d06345',marginTop:8}});
