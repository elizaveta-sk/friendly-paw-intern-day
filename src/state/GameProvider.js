// @ts-nocheck
import React, { createContext, useContext, useReducer } from 'react';
import { createInitialState } from '../engine/game.js';
import { gameReducer } from './gameState.js';
const GameContext = createContext(null);
export function GameProvider({children}) { const [state,dispatch] = useReducer(gameReducer, undefined, () => createInitialState('')); return <GameContext.Provider value={{state,dispatch}}>{children}</GameContext.Provider>; }
export const useGame = () => useContext(GameContext);
