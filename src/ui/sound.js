let ctx;
export function unlockSound() { try { ctx ||= new (globalThis.AudioContext || globalThis.webkitAudioContext)(); ctx.resume?.(); } catch (_) {} }
export function playBlip(muted) { if(muted) return; try { unlockSound(); if(!ctx) return; const osc=ctx.createOscillator(); const gain=ctx.createGain(); osc.frequency.value=620; gain.gain.setValueAtTime(.045,ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.07); osc.connect(gain).connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime+.08); } catch (_) {} }
