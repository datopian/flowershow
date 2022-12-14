import { useState, useEffect, useRef, Fragment } from "react";
import {
  arrow,
  autoPlacement,
  FloatingPortal,
  inline,
  offset,
  shift,
  useDismiss,
  useFloating,
  useHover,
  useFocus,
  useInteractions,
  useRole,
} from "@floating-ui/react";

import { motion, AnimatePresence } from "framer-motion";
import { allDocuments } from "contentlayer/generated";
import { marked } from "marked";

// import documentExtract from '../utils/documentExtract'
function getBody(content) {
  const body = /^[A-Za-z0-9].*/gm.exec(content);
  return body[0];
}

const tooltipBoxStyle = (theme) => ({
  height: "auto",
  maxWidth: "40rem",
  padding: "1rem",
  background: theme === "light" ? "#fff" : "#000",
  color: theme === "light" ? "rgb(99, 98, 98)" : "#A8A8A8",
  borderRadius: "4px",
  boxShadow: "rgba(0, 0, 0, 0.55) 0px 0px 16px -3px",
});

const tooltipBodyStyle = () => ({
  maxHeight: "4.8rem",
  position: "relative",
  lineHeight: "1.2rem",
  overflow: "hidden",
});

const tooltipArrowStyle = ({ theme, x, y, side }) => ({
  position: "absolute",
  left: x != null ? `${x}px` : "",
  top: y != null ? `${y}px` : "",
  right: "",
  bottom: "",
  [side]: "-4px",
  height: "8px",
  width: "8px",
  background: theme === "light" ? "#fff" : "#000",
  transform: "rotate(45deg)",
});

// export const Tooltip = ({ absolutePath, render, ...props }) => {
export const Tooltip = ({ render, ...props }) => {
  const theme = "light"; // temporarily hard-coded; light theme tbd in next PR

  const arrowRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipImage, setTooltipImage] = useState("");
  const [tooltipContentLoaded, setTooltipContentLoaded] = useState(false);
  // floating-ui hook
  const {
    x,
    y,
    reference, // trigger element back ref
    floating, // tooltip back ref
    placement, // default: 'bottom'
    strategy, // default: 'absolute'
    context,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} }, // data for arrow positioning
  } = useFloating({
    open: showTooltip, // state value binding
    onOpenChange: setShowTooltip, // state value setter
    middleware: [
      offset(5), // offset from container border
      autoPlacement({ padding: 5 }), // auto place vertically
      shift({ padding: 5 }), // flip horizontally if necessary
      arrow({ element: arrowRef, padding: 4 }), // add arrow element
      inline(), // correct position for multiline anchor tags
    ],
  });
  // floating-ui hook
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { delay: 100 }),
    useFocus(context),
    useRole(context, { role: "tooltip" }),
    useDismiss(context, { ancestorScroll: true }),
  ]);

  const triggerElementProps = getReferenceProps({ ...props, ref: reference });
  const tooltipProps = getFloatingProps({
    ref: floating,
    style: {
      position: strategy,
      left: x ?? "",
      top: y ?? "",
    },
  });

  const arrowPlacement = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }[placement.split("-")[0]];

  const fetchTooltipContent = () => {
    setTooltipContentLoaded(false);

    let image;
    let content;
    // get tooltip content
    // create a temporary anchor tag to convert relative href to absolute path
    try {
      const tempLink = document.createElement("a");
      tempLink.href = props.href;
      const filePath = tempLink.pathname.slice(1); // remove slash from the beginning

      const page = allDocuments.find((p) => p._raw.flattenedPath === filePath);
      // get the first paragraph from markdown content
      const paragraph = getBody(page.body.raw);
      // parse the markdown paragraph to html
      const html = marked.parse(paragraph);

      content = html;
      image = page.image;
    } catch (err) {
      return;
    }

    setTooltipImage(image);
    setTooltipContent(content);
    setTooltipContentLoaded(true);
  };

  useEffect(() => {
    if (showTooltip) {
      fetchTooltipContent();
    }
  }, [showTooltip]);

  return (
    <Fragment>
      {render(triggerElementProps)}
      <FloatingPortal>
        <AnimatePresence>
          {showTooltip && tooltipContentLoaded && (
            <motion.div
              {...tooltipProps}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <div
                className="tooltip-box flex items-center space-x-2"
                style={tooltipBoxStyle(theme)}
              >
                {tooltipImage && (
                  <img src={tooltipImage} alt="" width={100} height={100} />
                )}
                <div className="tooltip-body" style={tooltipBodyStyle(theme)}>
                  <div dangerouslySetInnerHTML={{ __html: tooltipContent }} />
                </div>
              </div>
              <div
                ref={arrowRef}
                className="tooltip-arrow"
                style={tooltipArrowStyle({
                  theme,
                  x: arrowX,
                  y: arrowY,
                  side: arrowPlacement,
                })}
              ></div>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Fragment>
  );
};
