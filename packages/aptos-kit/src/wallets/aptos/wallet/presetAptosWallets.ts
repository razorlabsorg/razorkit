import { IDefaultAptosWallet } from './types';

/**
 * A function that defines a wallet by freezing the provided parameters.
 *
 * @param {IDefaultAptosWallet} params - The parameters to define the wallet.
 * @return {IDefaultWallet} The frozen wallet parameters.
 */
export function defineAptosWallet(params: IDefaultAptosWallet) {
  return Object.freeze(params);
}

// register names of wallet adapters, used for detection
export enum PresetAptosWallet {
  RAZOR_APTOS_WALLET = 'Razor Wallet',
  PETRA_WALLET = 'Petra',
  NIGHTLY_WALLET = 'Nightly',
}

export const RazorAptosWallet = defineAptosWallet({
  name: PresetAptosWallet.RAZOR_APTOS_WALLET,
  label: 'Razor Wallet',
  iconUrl:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABNGSURBVHgB7d09jB3lucDxd47Nem3H0qaJ2NvgFFBiDNKFNLZpY75SRHGkmFwk0sUBmlRBQJIqDb6KOyIlF1LESsGHIS32NrmOFGNTmuKuq+U2uXsFtnfX3p3Me/Aha3u9X2fO7sw8v5+U7CdU2M//nXnfmSKNSPnJxMTCwu4jZZke6PWKR6rvPFJ9PlH9aH8CAO40XRRpupqVs0tL5aXq67Pj43MXi4Ozs2kEilSjPPRv3tzzUlmWefAfSQDAUKooOLu0lN6rZuv7u7/z+XSqSS0BcP2v9x/ZsaN4zdAHgNHJMbC4WL5RhcDZNKShAsDgB4BtMZ3KpZd3PfG/76dN2lQAVIN/fzX4f2/wA8D2KYriD4uLS29s5tZAL23Qwt8mX+oVvU8MfwDYXmVZ/kevV3y8cP7+H6cNWvcVgLzB78bC7tfKlF5OAECjVAP95NjjM69s4PfX1h/+N3Z/XK36H0kAQCMVRbq4uFh+bz23BNYMgHy/P19eSM7vA0AbTC8tlU+uFQGrBoDhDwCtND02dv3gag8RWnUT4I4dxbvJ8AeAttmfb92v9gv3DICF85NvuucPAO2UZ3ie5ff6+Yq3AKpL//lYwe8TANBqVQi8Mv7EzMk7v39XALjvDwAdkl8uVJYH79wUuMItgOL1ZPgDQDcUaSI/vffuby8zf37yuerDuwkA6JRbRwPPDr6+8wrAmwkA6Jz88r7lX38dAPnNfsmlfwDopPwOn1uzvu/rALizDACAblk+6/t7AG7t/P+fBAB02tjY9W/mJwT2rwCUZfFcAgA6b25uvP9W334A7NyZnk0AQOdVtwEO549F+cn+iYWF+f9LAEAI+TZAb25uzvP+ASCQhfldh/MtgCMJAAijTL1v93q94kACAMLo9coDvaJIEwkACKMsi0d6ZenpfwAQzETeA7A/AQCR7O8lACAcAQAAAQkAAAhIAABAQAIAAAISAAAQkAAAgIAEAAAEJAAAICABAAABCQAACEgAAEBAAgAAAhIAABCQAACAgAQAAAQkAAAgIAEAAAEJAAAISAAAQEACAAACEgAAEJAAAICABAAABCQAACAgAQAAAQkAAAhIAABAQAIAAAISAAAQkAAAgIAEAAAEJAAAICABAAABCQAACEgAAEBAAgAAAhIAABCQAACAgAQAAAQkAAAgIAEAAAEJAAAISAAAQEACAAACEgAAEJAAAICABAAABCQAACAgAQAAAQkAAAhIAABAQAIAAAISAAAQkAAAgIAEAAAEJAAAICABAAABCQAACEgAAEBAAgAAAhIAABCQAACAgAQAAAQkAAAgIAEAAAEJAAAISAAAQEACAAACEgAAEJAAAICABAAABCQAACAgAQAAAQkAAAhIAABAQAIAAAISAAAQkAAAgIAEAAAEJAAAICABAAABCQAACEgAAEBAOxMAG3bu7/Ppg3Pz/c9/9sO96YHJHQnapJg/P1kmANY0+0WZfvunL9OZqbl06fLN23725998Mz1zeDxBWwgAgDXk1f6vf/dlmrqwcM/fyVcALr/3rQRt4RYAwAoGq/1Tp6/2P1/LlZnFBG0iAABuyYN+6sJ8Nfivrrrahy4QAEB4+RJ/HvjrXe1DFwgAIKQ86N/56Fr64Nyc1T4hCQAglMHxvT/+5ZrVPqEJAKDzrPbhbgIA6Ky82j91+lp/Y5/VPtxOAACdstHjexCVAAA6YT0P6wH+RQAArWW1D5snAIBW8bAeqIcAAFrB8T2olwAAGsvxPRgdAQA0jtU+jJ4AABphsKHvzNRcunT5ZgJGSwAA22pwfO/Tz25Y7cMWEgDAlnN8D7afAAC2jIf1QHMIAGCkLl2+0d/Fb7UPzSIAgNo5vgfNJwCA2ji+B+0hAIChWO1DOwkAYFOs9qHdBACwbh7WA90hAIA1Ob4H3SMAgBV5WA90mwAAvpYH/dSF+WrwX7Xah44TAED/En8e+Fb7EIcAgKAc34PYBAAE4/gekAkACMBqH7iTAIAOy6v9U6ev9Tf2We0DywkA6BjH94D1EADQER7WA2yEAIAWs9oHNksAQMt4WA9QBwEALeH4HlAnAQAN5vgeMCoCABrIah8YNQEADTHY0Hdmai5dunwzAYySAIBtNji+9+lnN6z2gS0jAGAbOL4HbDcBAFvIw3qAphAAMGJW+0ATCQAYoV+99YXBDzSSAIARyAP/+z//h0v9QGP1ElA7wx9oOgEANcuX/Q1/oOkEANToysxieuej6wmg6QQA1Ci/pS9HAEDTCQCo0dsfWv0D7SAAoEZW/0BbCACokQAA2kIAAEBAAgAAAhIAABCQAACAgAQAAAQkAAAgIAEAAAEJAAAISAAAQEACAAACEgAAEJAAAICABAAABCQAACAgAQAAAQkAAAhIAABAQAIAAAISAAAQkAAAgIAEAAAEJAAAICABAAABCQAACEgAAEBAAgAAAhIAABCQAACAgAQAAAQkAAAgIAEAAAEJAAAISAAAQEACAAACEgAAEJAAAICABAAABCQAACAgAQAAAQkAAAhIAABAQAIAAAISAAAQkAAAgIAEAEANHpjckaBNBABADQQAbSMAAGpw/OieBG0iAACGlFf/hx8bS9AmAgBgSCeO7XULgNYRAABDeObweD8AoG0EAMAm5eH/1qsTCdpoZwJgQyb2FekXL+6z8qfVBADAOuXBf+LYN9JPf7C3/zm0mQAAWEUe9E8fGk/PP7UnHXrUTn+6QwAArCAP+3yPP5/vt9qniwQAwC2DS/x5+Fvt03UCAAgvD/tXf7LP0CcUAQCE9PCD96Vnj4zb0EdYAgAIIw/6H313T3/wW+0TnQAAOs+GPribAAA6abCh7/jR3Z7TDysQAECn2NAH6yMAgNZziR82TgAArWRDHwxHAACtkod9fgnPoUd3We3DEAQA0HhewgP1EwBAI+VBn1f5X632XeKHugkAoFFs6IOtIQCAbWdDH2w9AQBsm8GZ/fxcfqt92FoCANhS+al8zz+1x4Y+2GYCABg5l/iheQQAMDI29EFzCQCgVoMz+08fGk8HHvJXDDSVP51ALep6Cc+5v8+nD87N9z//2Q/3epMfjEgxf36yTEAtdj0+kyLJu/fzff1hN/TNflGm3/7py3Rmai5dunzztp/9+Tff7N9GAOolAKBGEQKgzg19ebX/6999maYuLNzzd/IVgMvvfSsB9XILAFiXujb0DVb7p05f7X++lisziwmonwAA7mmwoe/40d1D3YvPg37qwnw1+K+uutoHto4AAG6Th36+t1/Xhr488Ne72ge2jgAA+uq8xP/OR9fSB+fmrPahwQQABFb3hr58fO+Pf7lmtQ8tIAAgoDzsTxzbW33cZbUPQQkACGKwoa+Ol/Dk1f6p09f6G/us9qGdBAB0WB70+ZG8+e17w17i3+jxPaDZBAB0UJ0v4VnPw3qA9hEA0BGDS/x5+FvtA2sRANBydb2Ex8N6IBYBAC2Un8qX7+vXtaHP8T2IRwBAS9R5Zt/xPUAAQMPVvaHPah/IBAA00GBDXz7Cd+Ch4f6YDjb0nZmaS5cu30wAmQCABqlrQ182OL736Wc3rPaBuwgA2GZ52B9+bFctG/oc3wPWSwDANqhzQ1/mYT3ARgkAqFE+nndlZvGeP8/DPh/fy/f2h13tX7p8o7+L32of2AwBADXK9+9f/OXsbd+r8yU8ju8BdREAUKPjR3enhx/cmd7+8Hr/6zov8Tu+B9SpmD8/6W8TaCCr/X+p/p5KQL1cAYCGsdoHtoIAgAbwsB5gqwkA2EaO7wHbRQDAFvOwHqAJBABsgTzopy7MV4P/qtU+0AgCAEYoX+LPA99qH2gaAQA1c3wPaAMBADVxfA9oEwEAQ7DaB9pKAMAm5NX+qdPX+hv7rPaBNhIAsE6O7wFdIgBgDR7WA3SRAIAVWO0DXScA4BYP6wEiEQCE5/geEJEAICTH94DoBAChWO0DfEUA0HmDDX1npubSpcs3EwACgA4bHN/79LMbVvsAdxAAdIrjewDrIwDoBA/rAdgYAUBrWe0DbJ4AoJV+9dYXBj/AEAQArZIH/vd//g+X+gGG1EvQIoY/QD0EAK2RL/sb/gD1EAC0wpWZxfTOR9cTAPUQALRCfktfjgAA6iEAaIW3P7T6B6iTAKAVrP4B6iUAaAUBAFAvAQAAAQkAAAhIAABAQAIAAAISAAAQkAAAgIAEAAAEJAAAICABAAABCQAACEgAAEBAAgAAAhIAABCQAACAgAQAAAQkAAAgIAEAAAEJAAAISAAAQEACAAACEgAAEJAAAICABAAABCQAACAgAQAAAQkAAAhIAABAQAIAAAISAAAQkAAAgIAEAAAEJAAAICABAAABCQAACEgAAEBAAgAAAhIAABCQAACAgAQAAAQkAAAgIAEAAAEJAAAISAAAQEACAAACEgBAoz0wuSMB9RMAQKMJABgNAQA02vGjexJQPwEANFZe/R9+bCwB9RMAQGOdOLbXLQAYEQEANNIzh8f7AQCMhgAAGicP/7denUjA6OxMAA0xsa9Iv3hxn5U/bAEBAGy7PPhPHPtG+ukP9vY/B0ZPAADbIg/6pw+Np+ef2pMOPWqnP2w1AQBsqTzs8z3+fL7fah+2jwAARm5wiT8Pf6t9aAYBAIxMHvav/mSfoQ8NJACAWj384H3p2SPjNvRBwwkAYGh50P/ou3v6g99qH9pBAACbZkMftJcAADZksKHv+NHdntMPLSYAgHWxoQ+6RQAA9+QSP3SXAABuY0MfxCAAgL487PNLeA49ustqHwIQABCYl/BAXAIAgsmDPq/yv1rtu8QPUQkACMKGPmA5AQAdZkMfcC8CADpocGY/P5ffah9YiQCAjshP5Xv+qT029AHrIgCgxVziBzZLAEAL2dAHDEsAQEsMzuw/fWg8HXjIH11gOP4WgYbzEh5gFAQANFDevZ/v69vQB4yKAICGsKEP2EoCALaZDX3AdhAAsA0GG/qOH93dP78PsNUEAGyRPPTzvX0b+oAmEAAwYi7xA00kAGAEbOgDmk4AQI3ysD9xbG/1cZfVPtBoAgCGNNjQ58w+0CYCADYhD/r8SN789j2X+IE2EgCwATb0AV0hAGANg0v8efhb7QNdIQDgHryEB+gyAQDLeAkPEIUAIDxn9oGIBABh2dAHRCYACGWwoS8f4TvwkP/8gbj8DUgINvQB3E4A0Fl52B9+bJcNfQArEAB0ig19AOsjAGiFByZ3pCszi/f8eR72+bG8+d6+1T7A2gQArZDv37/4y9nbvuclPACbV8yfnywTtMClyzfS2x9e73/uEj/AcAQAAATUSwBAOAIAAAISAAAQkAAAgIAEAAAEJAAAICABAAABCQAACEgAAEBAAgAAAhIAABCQAACAgAQAAAQkAAAgIAEAAAEJAAAISAAAQEACAAACEgAAEJAAAICABAAABCQAACAgAQAAAQkAAAhIAABAQAIAAAISAAAQkAAAgIAEAAAEJAAAICABAAABCQAACEgAAEBAAgAAAhIAABCQAACAgAQAAAQkAAAgIAEAAAEJAAAISAAAQEACAAACEgAAEJAAAICABAAABCQAACAgAQAAAQkAAAhIAABAQAIAAAISAAAQkAAAgIAEAAAEJAAAICABAAABCQAACEgAAEBAAgAAAhIAABCQAACAgAQAAAQkAAAgIAEAAAEJAAAISAAAQEACAAACEgAAEJAAAICABAAABCQAACAgAQAAAQkAAAhIAABAQAIAAAISAAAQkAAAgIAEAAAEJAAAICABAAABCQAACEgAAEBAAgAAAhIAABCQAACAgAQAAAQkAAAgoBwA0wkAiGS6CoBiNgEAYZRlOd1bWlq6lACAQIr/75VlcTEBAGFUVwAu9nbssAcAAII52xsb23U2AQBhjI/PXewVB6dniyKdTQBA51WX/88WB2dn+88BWFwszyUAIIDi/fz//QAYHx8/mQCAzquuALyXP/YDwG0AAOi+fPl/93c+n86ff/0o4Oo2wBsJAOisskxfz/pi+Q8W/jb5cfXDIwkA6JrpXY/PfHvwxW0vA3IVAAA665XlX9wWANV9gbP2AgBAtxRF+Ydq9f/e8u/d9Trg6irAC6n0giAA6IjpxcV01xX+uwIg7w4sk1sBANAFRSpfH+z8X6630i+PPzFzsizTfyYAoLXyLB97/PP/WulnxWr/4Pz5f/uk+scfSQBAqxRFujj27zMH7/Xz3mr/8NjY2JPVh+kEALRJdd+//N5qv7BqAOQnBC4tlSIAANpjOs/ule77L7fqLYCB63+9f3+v13vX7QAAaK582f+++64/md/2t+bvpg2Y++/Jk9W//KUEADRK3vA3/sTMy+v9/V7agPwvri4rvJDcEgCAZiiL2Wr4v7KR4Z9t6ArAQL4lUH14vdcrfpwAgG2R3+5XDf8X1rrfv5JNBcDA/PnJ56oPb1b/258AgC1xa/C/kR/hnzZpqAAYqK4IHNlRpNfKojiSAICRqGPwD9QSAAP51kBRFM/2UvmcGACA4d0a+ufGx+dOrmd3/3rVGgDLlZ9MTMzNjedjg0d6RXGgSOXEUnWroAqE/QkAuE016KerGTlblOXFpVRcLIp0ZWzs+tk6h/5y/wRUwXnWRW1utwAAAABJRU5ErkJggg==',
  downloadUrl: {
    browserExtension:
      'https://chromewebstore.google.com/detail/razor-wallet/fdcnegogpncmfejlfnffnofpngdiejii',
  },
});

export const PetraWallet = defineAptosWallet({
  name: PresetAptosWallet.PETRA_WALLET,
  label: 'Petra',
  iconUrl:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTI4IiBjeT0iMTI4IiByPSIxMjgiIGZpbGw9IiNGRjYyNjMiPjwvY2lyY2xlPjxwYXRoIGQ9Ik0xMjUgNTRWMjAxQzkyLjYgMjAxIDc4LjE2NjcgMTcxLjMzMyA3NSAxNTYuNVY3MS41TDEyNSA1NFoiIGZpbGw9IndoaXRlIj48L3BhdGg+PHBhdGggZD0iTTEzMi41IDEzOS41VjU0TDE4MSA3MS41Vjk4LjVDMTczLjggMTM0LjEgMTQ1LjY2NyAxNDAuNjY3IDEzMi41IDEzOS41WiIgZmlsbD0id2hpdGUiPjwvcGF0aD48L3N2Zz4=',
  downloadUrl: {
    browserExtension:
      'https://chromewebstore.google.com/detail/petra-aptos-wallet/ejjladinnckdgjemekebdpeokbikhfci',
  },
});

export const NightlyWallet = defineAptosWallet({
  name: PresetAptosWallet.NIGHTLY_WALLET,
  label: 'Nightly',
  iconUrl:
    'data:image/png;base64,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',
  downloadUrl: {
    browserExtension:
      'https://chromewebstore.google.com/detail/fiikommddbeccaoicoejoniammnalkfa',
  },
});
