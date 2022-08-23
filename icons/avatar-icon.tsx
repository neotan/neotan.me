import { SvgIconProps } from '~/types/index'
export default function AvatarIcon({
  size,
  title = 'Avatar',
  className,
}: SvgIconProps & { width?: number; height?: number }) {
  return (
    <svg className={className}>
      <title>{title}</title>
      <g transform="translate(0.000000,1272.000000) scale(0.100000,-0.100000)">
        <path d="M6779 12285 c-204 -32 -423 -99 -650 -198 -155 -68 -158 -69 -364 -107 -538 -98 -818 -228 -1133 -524 l-68 -65 -55 23 c-30 12 -95 44 -144 71 -130 72 -205 103 -313 133 -166 44 -438 36 -812 -24 -119 -19 -242 -60 -362 -120 -262 -131 -451 -296 -638 -559 -36 -49 -119 -146 -185 -215 -200 -208 -319 -374 -436 -614 -33 -66 -91 -182 -129 -256 -169 -332 -200 -508 -201 -1135 -1 -203 -1 -471 -2 -595 -1 -208 1 -235 26 -365 28 -138 70 -309 108 -434 l19 -65 -29 -37 c-38 -46 -49 -93 -59 -241 l-9 -117 -81 -85 c-58 -60 -83 -94 -87 -118 -4 -19 7 -145 24 -284 27 -222 51 -451 66 -644 13 -148 13 -149 64 -174 57 -30 64 -37 140 -167 73 -123 127 -182 231 -252 41 -28 78 -55 82 -60 3 -6 24 -85 47 -176 93 -382 213 -688 352 -900 177 -269 490 -496 851 -616 496 -165 871 -211 2078 -256 173 -6 315 -12 315 -13 1 0 -1 -28 -3 -62 l-4 -61 -172 -11 c-329 -22 -479 -48 -720 -123 -172 -54 -231 -85 -316 -166 -60 -56 -190 -229 -190 -252 0 -4 16 -22 35 -41 l35 -34 58 63 c65 72 105 86 184 66 86 -22 124 -64 163 -183 23 -70 43 -80 126 -59 68 17 92 12 125 -24 75 -86 94 -266 60 -549 -13 -103 -108 -553 -121 -568 -1 -1 -26 6 -56 17 -54 18 -169 39 -159 28 3 -3 39 -28 80 -55 41 -27 95 -70 119 -95 l43 -45 -11 -51 c-6 -29 -11 -116 -11 -194 0 -162 -15 -250 -59 -343 -77 -164 -184 -216 -546 -264 -109 -15 -187 -20 -245 -17 -106 7 -379 69 -440 101 -271 141 -307 168 -342 255 -22 53 -23 70 -23 306 0 166 4 263 12 290 l12 40 -24 -30 c-54 -66 -105 -257 -105 -396 0 -200 84 -374 272 -560 l79 -79 508 0 507 0 85 29 c46 15 126 49 177 75 l92 46 0 -32 c-1 -18 -5 -52 -9 -75 l-8 -43 1893 0 c1703 0 1894 2 1894 15 0 9 -7 78 -16 153 -21 177 -15 377 15 478 11 39 35 104 54 145 l33 74 48 -65 c144 -195 294 -500 350 -710 l23 -85 689 -3 690 -2 37 50 c75 101 89 137 84 217 -4 70 -10 84 -172 415 -198 403 -293 584 -402 768 -205 344 -482 689 -804 1006 -231 225 -375 313 -615 373 -103 26 -414 77 -559 91 -267 26 -289 30 -304 45 -13 12 -16 39 -16 120 0 57 3 106 6 109 3 3 64 11 135 17 1337 111 2104 254 2545 474 173 87 335 208 440 330 70 82 182 253 229 350 56 118 111 293 170 540 28 121 58 234 65 251 10 24 30 40 89 69 110 54 196 150 289 324 24 45 36 56 86 79 47 21 60 33 65 55 3 15 13 125 21 245 22 310 43 523 60 627 35 216 12 287 -110 336 l-40 17 -6 128 c-7 135 -16 186 -51 269 -22 54 -22 52 6 300 8 72 25 276 37 455 40 614 15 1115 -81 1600 -46 231 -89 341 -195 504 -61 94 -160 289 -200 394 -15 40 -45 99 -66 132 -59 88 -196 211 -343 308 -102 67 -158 114 -256 212 -70 71 -167 155 -220 193 -107 75 -270 159 -405 207 -128 46 -155 62 -237 135 -94 85 -256 194 -363 245 -156 75 -389 138 -590 161 -188 21 -516 -3 -752 -56 -65 -15 -151 -27 -191 -28 l-74 -2 -20 50 c-11 28 -31 63 -46 78 -35 37 -133 84 -201 97 -77 14 -469 11 -572 -5z m-3463 -2705 c418 -34 922 -181 1425 -416 302 -141 603 -258 890 -348 377 -117 668 -135 1013 -64 185 37 353 98 866 311 434 180 1105 392 1394 442 291 49 657 47 926 -6 295 -59 530 -173 708 -344 102 -97 161 -175 239 -314 52 -92 133 -273 133 -296 0 -5 -12 2 -26 16 l-27 24 17 -32 c21 -42 21 -51 -10 -117 l-25 -56 -93 0 -93 0 5 30 c4 26 8 30 36 30 61 0 101 47 90 105 -6 32 -9 34 -33 29 -101 -25 -112 -50 -124 -296 -8 -184 -7 -205 12 -296 23 -108 27 -202 9 -235 -19 -36 -129 -161 -154 -175 -24 -13 -131 -5 -253 18 -178 34 -731 64 -991 55 -696 -25 -1322 -149 -1830 -361 -143 -60 -209 -65 -445 -35 -215 28 -511 45 -670 38 -141 -6 -343 -40 -522 -87 -62 -17 -123 -30 -137 -30 -14 0 -94 36 -178 79 -328 169 -593 245 -1028 295 -267 31 -474 38 -887 33 -519 -7 -722 -27 -1008 -102 -174 -45 -282 -87 -483 -190 l-169 -85 -111 0 -112 0 0 35 c0 117 55 536 101 775 94 481 214 810 394 1081 137 206 294 337 501 417 95 38 319 75 480 81 23 0 99 -4 170 -9z m4016 -2512 c55 -20 91 -43 124 -74 25 -25 43 -48 40 -51 -3 -4 -79 30 -169 74 -89 45 -180 87 -202 93 -77 24 -57 28 36 8 52 -11 129 -33 171 -50z m-709 -72 c147 -17 172 -28 234 -104 54 -67 63 -101 63 -253 0 -103 6 -158 34 -300 19 -96 42 -194 51 -219 9 -25 29 -95 45 -156 46 -178 140 -347 292 -521 151 -173 313 -280 563 -370 83 -30 173 -61 200 -68 66 -18 399 -72 498 -81 43 -4 73 -10 67 -14 -17 -11 402 -24 530 -17 134 7 402 58 511 96 46 16 125 48 174 70 79 35 91 43 100 72 8 27 21 38 81 65 98 46 142 52 177 24 36 -29 34 -41 -5 -29 -17 5 -33 7 -35 5 -9 -9 30 -28 67 -33 l40 -6 0 36 c0 33 3 36 46 51 l45 15 -3 -42 c-3 -42 -2 -42 38 -51 l41 -8 6 -103 c4 -83 10 -115 31 -160 32 -71 32 -87 1 -133 -19 -28 -25 -50 -25 -89 0 -46 -3 -53 -20 -53 -16 0 -20 -7 -20 -30 0 -17 -8 -47 -19 -68 -10 -20 -33 -82 -51 -137 -34 -108 -60 -164 -83 -183 -8 -7 -52 -25 -98 -41 -46 -15 -120 -47 -165 -71 -66 -34 -96 -44 -160 -50 -106 -11 -123 -16 -235 -66 -123 -55 -210 -80 -334 -99 -56 -8 -188 -35 -295 -59 -107 -25 -276 -59 -375 -76 -99 -16 -186 -32 -193 -35 -35 -13 -396 -35 -477 -29 -67 5 -124 1 -225 -14 -100 -16 -207 -22 -410 -27 -151 -3 -315 -10 -365 -15 -78 -9 -867 -25 -1190 -24 -560 1 -1361 43 -1625 84 -30 5 -101 9 -157 9 -56 1 -132 7 -170 15 -37 8 -104 17 -148 21 -208 17 -356 48 -695 145 -366 105 -367 106 -530 211 -68 44 -120 70 -147 75 -40 6 -45 11 -85 81 -28 50 -56 84 -83 102 -53 36 -65 62 -65 151 0 41 -7 120 -15 175 -8 55 -15 128 -15 163 l0 62 -41 0 c-38 0 -41 2 -34 23 4 12 10 63 12 113 5 91 5 91 -27 128 -54 61 -60 136 -20 256 l18 56 -49 98 c-54 107 -58 125 -31 149 16 15 22 14 71 -8 46 -22 55 -31 74 -75 18 -43 27 -52 65 -67 24 -9 71 -39 105 -66 34 -27 88 -62 119 -78 32 -16 99 -56 150 -90 106 -70 273 -154 398 -200 229 -85 433 -148 511 -159 46 -6 113 -16 148 -20 54 -8 70 -15 100 -44 46 -44 63 -51 197 -71 238 -36 692 -9 919 55 39 11 175 38 303 61 129 22 258 49 287 60 30 11 89 44 132 73 43 29 101 65 129 79 58 29 129 104 206 217 28 41 81 113 118 160 68 87 197 310 231 399 10 28 26 106 34 173 9 68 25 168 35 222 11 54 20 128 20 163 0 47 9 92 34 166 19 56 42 140 51 187 18 90 44 146 73 153 34 9 120 6 245 -7z m-63 -3914 c0 -32 -79 -271 -96 -291 -1 -2 -17 7 -34 19 -45 32 -89 125 -109 233 l-8 47 123 0 c68 0 124 -4 124 -8z m156 -1144 c68 -71 119 -144 165 -240 l22 -46 -49 -89 -49 -88 -115 -57 c-104 -51 -121 -57 -182 -57 l-68 -1 0 -34 c0 -28 -7 -41 -37 -65 l-37 -31 -34 67 c-32 63 -33 69 -21 110 11 42 11 45 -15 72 -24 25 -38 91 -18 91 6 0 44 -22 151 -87 60 -38 105 -29 169 31 71 66 79 119 30 192 -46 67 -97 105 -150 111 -43 5 -47 3 -106 -52 -34 -31 -62 -51 -62 -44 0 30 42 80 95 114 30 19 79 51 109 70 30 19 67 50 83 70 15 19 33 35 39 35 6 0 42 -33 80 -72z" />
        <path d="M6593 5195 c26 -125 38 -218 30 -226 -5 -5 -73 -12 -151 -16 l-142 -6 -1 39 c-1 39 -1 39 -20 -21 -27 -84 -25 -85 172 -85 206 0 206 0 184 119 -15 77 -57 207 -72 220 -3 4 -3 -7 0 -24z" />
      </g>
    </svg>
  )
}
