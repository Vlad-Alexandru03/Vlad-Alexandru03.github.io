import type { ProjectId } from "../content/portfolio";

export function EngineeringVisual({
  variant = "balancing-robot",
  hero = false,
}: {
  variant?: ProjectId;
  hero?: boolean;
}) {
  const isRobot = variant === "balancing-robot";
  const isEdge = variant === "edge-fog";
  return (
    <div
      className={`engineering-visual visual-${variant} ${hero ? "hero-visual" : ""}`}
    >
      <div className="drawing-meta">
        <span>
          {isRobot
            ? "CLOSED-LOOP CONTROL"
            : isEdge
              ? "EDGE → FOG → CLOUD"
              : variant === "water-control"
                ? "PROCESS CONTROL"
                : variant === "bearguard"
                  ? "SENSE → PROCESS → ACT"
                  : "CONNECTED INFRASTRUCTURE"}
        </span>
        <span>FIG. {isRobot ? "01" : isEdge ? "02" : "03"}</span>
      </div>
      <svg viewBox="0 0 540 340" fill="none" aria-hidden="true">
        <path
          d="M40 284H500M270 30V310M70 45V295M470 45V295"
          className="construction"
        />
        <path
          d="M65 284h10m-5-5v10M465 284h10m-5-5v10M265 45h10m-5-5v10"
          className="construction"
        />
        {isRobot ? (
          <>
            <ellipse cx="270" cy="285" rx="111" ry="10" className="ground" />
            <path d="M270 273V68" className="axis" />
            <g className="robot-body">
              <path
                d="M232 108 315 87 347 215 263 237Z"
                className="body-side"
              />
              <path d="m225 103 83-21 7 5-83 21Z" className="body-top" />
              <path d="m225 103 7 5 31 129-7-5Z" className="body-edge" />
              <path d="m247 124 54-14 17 68-54 14Z" className="board" />
              <path
                d="m257 132 32-8m-29 21 32-8m-29 21 32-8m-28 21 32-8"
                className="board-lines"
              />
              <circle cx="272" cy="207" r="6" className="sensor" />
              <path d="m244 248 66-17" className="axle" />
              <ellipse
                cx="246"
                cy="254"
                rx="22"
                ry="30"
                transform="rotate(-14 246 254)"
                className="wheel"
              />
              <ellipse
                cx="315"
                cy="237"
                rx="23"
                ry="31"
                transform="rotate(-14 315 237)"
                className="wheel"
              />
              <ellipse
                cx="315"
                cy="237"
                rx="9"
                ry="13"
                transform="rotate(-14 315 237)"
                className="wheel-inner"
              />
            </g>
            <path d="M270 67a55 55 0 0 1 23 3" className="accent-stroke" />
            <path
              d="m288 66 6 4-6 3M350 154h54l15-16M252 208h-69l-19 17"
              className="annotation-line"
            />
            <text x="365" y="132" className="svg-label">
              IMU FEEDBACK
            </text>
            <text x="93" y="242" className="svg-label">
              PID CONTROL
            </text>
            <text x="296" y="55" className="svg-symbol">
              θ
            </text>
            <path
              d="M170 99c-28 15-45 47-42 77m-5-9 5 10 7-8"
              className="loop-line"
            />
            <text x="88" y="118" className="svg-small">
              FEEDBACK
            </text>
          </>
        ) : isEdge ? (
          <>
            <path d="M125 166h69m140 0h76" className="connection" />
            <path
              d="m185 161 9 5-9 5m216-10 9 5-9 5"
              className="accent-stroke"
            />
            <rect
              x="57"
              y="126"
              width="75"
              height="80"
              rx="8"
              className="diagram-node"
            />
            <rect
              x="200"
              y="107"
              width="133"
              height="119"
              rx="10"
              className="diagram-primary"
            />
            <rect
              x="411"
              y="126"
              width="75"
              height="80"
              rx="8"
              className="diagram-node"
            />
            <path
              d="m74 172 7-11 8 16 8-26 8 20 8-9"
              className="accent-stroke"
            />
            <circle cx="233" cy="139" r="4" className="cluster-dot" />
            <circle cx="245" cy="150" r="4" className="cluster-dot" />
            <circle cx="229" cy="155" r="4" className="cluster-dot" />
            <circle cx="279" cy="166" r="4" className="cluster-dot light" />
            <circle cx="291" cy="177" r="4" className="cluster-dot light" />
            <circle cx="274" cy="182" r="4" className="cluster-dot light" />
            <path
              d="M431 151h35m-35 13h35m-35 13h22"
              className="accent-stroke"
            />
            <text x="57" y="247" className="svg-label">
              SENSOR DATA
            </text>
            <text x="218" y="247" className="svg-label">
              CLUSTER & CLASSIFY
            </text>
            <text x="405" y="247" className="svg-label">
              ENCODE
            </text>
            <text x="224" y="208" className="svg-light">
              MATLAB PIPELINE
            </text>
          </>
        ) : variant === "water-control" ? (
          <>
            <path d="M178 99v145h118V99" className="tank" />
            <path d="M180 177h114v65H180z" className="water" />
            <path d="M180 177q28-12 57 0t57 0" className="accent-stroke" />
            <path d="M237 99V73h120v172h-61" className="connection" />
            <rect
              x="331"
              y="131"
              width="53"
              height="42"
              rx="5"
              className="diagram-primary"
            />
            <text x="341" y="157" className="svg-light">
              MPC
            </text>
            <text x="163" y="276" className="svg-label">
              MODEL · SIMULATE · CONTROL
            </text>
          </>
        ) : variant === "bearguard" ? (
          <>
            <rect
              x="80"
              y="125"
              width="95"
              height="77"
              rx="7"
              className="diagram-node"
            />
            <circle cx="128" cy="163" r="22" className="accent-stroke" />
            <circle cx="128" cy="163" r="10" className="sensor" />
            <path d="M175 164h55m80 0h55" className="connection" />
            <rect
              x="230"
              y="117"
              width="80"
              height="94"
              rx="7"
              className="diagram-primary"
            />
            <text x="248" y="166" className="svg-light">
              RPI
            </text>
            <path d="M370 200v-75h60v75m-45-38h30" className="tank" />
            <text x="85" y="250" className="svg-label">
              THERMAL IMAGE → INFERENCE → ACTUATION
            </text>
          </>
        ) : (
          <>
            <rect
              x="215"
              y="110"
              width="110"
              height="120"
              rx="8"
              className="diagram-primary"
            />
            <path
              d="M238 142h65m-65 18h65m-65 18h65m-65 18h35"
              className="board-lines"
            />
            <path
              d="M215 166H125v-45m200 45h90v-45m-145 109v40"
              className="connection"
            />
            <circle cx="125" cy="102" r="20" className="diagram-node" />
            <circle cx="415" cy="102" r="20" className="diagram-node" />
            <circle cx="270" cy="282" r="14" className="diagram-node" />
            <text x="168" y="70" className="svg-label">
              SELF-HOSTED · CONNECTED
            </text>
          </>
        )}
      </svg>
      <div className="drawing-caption">
        <span>
          {hero ? "SENSING. COMPUTATION. ACTION." : "Conceptual illustration"}
        </span>
        <span aria-hidden="true">↗</span>
      </div>
    </div>
  );
}
