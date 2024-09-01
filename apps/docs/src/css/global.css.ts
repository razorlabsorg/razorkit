import { globalFontFace, globalStyle } from '@vanilla-extract/css';
import { vars } from './vars.css';

globalFontFace('Satoshi', {
  fontDisplay: 'auto',
  fontStyle: 'normal',
  fontWeight: 400,
  src: "url('/fonts/Satoshi-Regular.woff') format('woff')",
});

globalFontFace('Satoshi', {
  fontDisplay: 'auto',
  fontStyle: 'normal',
  fontWeight: 500,
  src: "url('/fonts/Satoshi-Medium.woff') format('woff')",
});

globalFontFace('Satoshi', {
  fontDisplay: 'auto',
  fontStyle: 'normal',
  fontWeight: 700,
  src: "url('/fonts/Satoshi-Bold.woff') format('woff')",
});

globalFontFace('Satoshi', {
  fontDisplay: 'auto',
  fontStyle: 'normal',
  fontWeight: 800,
  src: "url('/fonts/Satoshi-Black.woff') format('woff')",
});

globalFontFace('SFMono', {
  fontDisplay: 'auto',
  fontStyle: 'normal',
  fontWeight: 800,
  src: "url('/fonts/SF-Mono-Regular.eot?') format('embedded-opentype'), url('/fonts/SF-Mono-Regular.woff2') format('woff2'), url('/fonts/SF-Mono-Regular.woff') format('woff')",
});

globalStyle('*, ::before, ::after', {
  boxSizing: 'border-box',
});

globalStyle('::selection', {
  backgroundColor: 'var(--selectionColor)',
  color: vars.colors.labelWhite,
  WebkitTextFillColor: vars.colors.labelWhite,
});

globalStyle('body', {
  backgroundColor: vars.colors.backgroundElevated,
  color: vars.colors.label,
  fontFamily: 'Satoshi, sans-serif',
  fontSize: '100%',
  letterSpacing: 0.35,
  margin: 0,
});

globalStyle('code, pre', {
  fontFamily: 'SFMono, ui-monospace, monospace',
  fontWeight: 400,
  MozOsxFontSmoothing: 'subpixel-antialiased',
  WebkitFontSmoothing: 'subpixel-antialiased',
});

globalStyle('button', {
  appearance: 'none',
  background: 'transparent',
});

globalStyle('svg', {
  verticalAlign: 'middle',
});

globalStyle('[data-emoji]', {
  fontFamily: 'system-ui',
  fontWeight: 400,
});
