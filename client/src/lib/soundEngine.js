// Web Audio API Synthesizer for Sargam Dance Studio
// Provides:
// 1. Kick & Hi-Hat dance beat pulse
// 2. Authentic Indian classical Swaras (Sa, Re, Ga, Ma, Pa, Dha, Ni)
// 3. UI interaction click & success sounds

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlayingBeat = false;
    this.bpm = 105;
    this.timerId = null;
    this.step = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a kick drum sound
  playKick() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Play hi-hat / cymbal tap
  playHiHat() {
    try {
      this.init();
      // White noise buffer for hihat
      const bufferSize = this.ctx.sampleRate * 0.05;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 7000;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    } catch {
      // fallback
    }
  }

  // Play single Swara (Sa, Re, Ga, Ma, Pa, Dha, Ni)
  playSwara(frequency, duration = 0.5) {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle'; // warm sitar/tanpura-like harmonic
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio fallback
    }
  }

  // Play celebration fanfare / chime
  playCelebration() {
    try {
      this.init();
      const notes = [261.63, 329.63, 392.00, 523.25];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playSwara(freq, 0.4);
        }, idx * 90);
      });
    } catch {}
  }

  // Start continuous rhythmic beat
  startBeat(bpm = 105, onBeatCallback) {
    this.bpm = bpm;
    this.isPlayingBeat = true;
    this.init();

    const intervalMs = (60 / this.bpm) * 1000;

    const tick = () => {
      if (!this.isPlayingBeat) return;
      
      // Kick on 1 and 3, Hi-hat on 2 and 4
      if (this.step % 2 === 0) {
        this.playKick();
      } else {
        this.playHiHat();
      }

      if (onBeatCallback) {
        onBeatCallback(this.step % 4);
      }

      this.step = (this.step + 1) % 4;
      this.timerId = setTimeout(tick, intervalMs);
    };

    tick();
  }

  stopBeat() {
    this.isPlayingBeat = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  setBPM(newBpm) {
    this.bpm = newBpm;
  }
}

export const soundEngine = new SoundEngine();
