// @ts-check
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GameProvider, useGame } from './src/state/GameProvider.js';
import { NameEntryScreen } from './src/ui/NameEntryScreen.js';
import { GameScreen } from './src/ui/GameScreen.js';
import { ReviewScreen } from './src/ui/ReviewScreen.js';

export default function App() { return <GameProvider><Shell /></GameProvider>; }
function Shell() { const {state,dispatch}=useGame(); return <SafeAreaView style={styles.page}>{state.phase==='name_entry'?<NameEntryScreen onStart={(playerName)=>dispatch({type:'START_GAME',playerName})}/>:state.phase==='review'?<ReviewScreen state={state} onRestart={()=>dispatch({type:'RESTART'})}/>:<GameScreen state={state} onChoice={(choiceId)=>dispatch({type:'CHOOSE',choiceId})} onMute={()=>dispatch({type:'TOGGLE_MUTE'})}/>}</SafeAreaView>; }
const styles = StyleSheet.create({ page: { flex: 1 } });
