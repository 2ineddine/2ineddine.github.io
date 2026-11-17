/**
 * Optimised image set (WebP, right-sized). Originals are kept next to these files, just not imported.
 * Generated from real dimensions so <img width/height> reserve the exact space (no layout shift).
 */

import nvidia_640 from './nvidia-640.webp';
import nvidia_960 from './nvidia-960.webp';
import detection_640 from './detection-640.webp';
import detection_960 from './detection-960.webp';
import yolo26_640 from './yolo26-640.webp';
import yolo26_960 from './yolo26-960.webp';
import labor_code_640 from './labor-code-640.webp';
import labor_code_960 from './labor-code-960.webp';
import sources_separation_640 from './sources-separation-640.webp';
import sources_separation_960 from './sources-separation-960.webp';
import txttospeech_640 from './txttospeech-640.webp';
import txttospeech_960 from './txttospeech-960.webp';
import jungle_640 from './jungle-640.webp';
import jungle_960 from './jungle-960.webp';
import orange_logo from './orange-logo.webp';
import sorbonne_logo from './sorbonne-logo.webp';
import lyon1_logo from './lyon1-logo.webp';
import google_logo from './google-logo.webp';
import ibm_logo from './ibm-logo.webp';
import duke_logo from './duke-logo.webp';
import coursera_logo from './coursera-logo.webp';

export type Cover = { src: string; srcSet: string; width: number; height: number };

const cover = (small: string, big: string, w: number, h: number): Cover => ({ src: big, srcSet: `${small} 640w, ${big} ${w}w`, width: w, height: h });

export const covers = {
  nvidia: cover(nvidia_640, nvidia_960, 960, 459),
  motion: cover(detection_640, detection_960, 960, 540),
  yolo26: cover(yolo26_640, yolo26_960, 850, 569),
  laborCode: cover(labor_code_640, labor_code_960, 960, 656),
  sourceSeparation: cover(sources_separation_640, sources_separation_960, 960, 524),
  matcha: cover(txttospeech_640, txttospeech_960, 960, 640),
  jungle: cover(jungle_640, jungle_960, 960, 540),
};

export type Logo = { src: string; width: number; height: number };
export const logos: Record<string, Logo> = {
  orange: { src: orange_logo, width: 128, height: 126 },
  sorbonne: { src: sorbonne_logo, width: 128, height: 128 },
  lyon1: { src: lyon1_logo, width: 115, height: 128 },
  google: { src: google_logo, width: 128, height: 128 },
  ibm: { src: ibm_logo, width: 128, height: 58 },
  duke: { src: duke_logo, width: 128, height: 67 },
  coursera: { src: coursera_logo, width: 128, height: 41 },
};
