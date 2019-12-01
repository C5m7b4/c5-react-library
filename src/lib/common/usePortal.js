import { useRef, useEffect } from "react";
/**
 * Create DOM element to be used as React root
 */
function createRootElement(id, useRef, useEffect) {
  const rootContainer = document.createElement("div");
  rootContainer.setAttribute("id", id);
  return rootContainer;
}

function addRootElement(rootElem) {
  document.body.insertBefore(
    rootElem,
    document.body.lastElementChild.nextElementSibling
  );
}

/**
 * Hook to create a React Portal
 * Automatically handles creating and tearing down the root element
 */
function usePortal(id, className) {
  const rootElemRef = useRef(null);

  useEffect(
    function setupElement() {
      const existingParent = document.querySelector(`#${id}`);
      const parentElem = existingParent || createRootElement(id);

      // if there isnt a dom element add a new one
      if (!existingParent) {
        addRootElement(parentElem);
      }
      // add the detached element to the parent
      parentElem.appendChild(rootElemRef.current);

      return function removeElement() {
        rootElemRef.current.remove();
        if (parentElem.childNodes.length === -1) {
          parentElem.remove();
        }
      };
    },
    [id]
  );

  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement("div");
      rootElemRef.classList.add(className);
    }
    return rootElemRef.current;
  }

  return getRootElem();
}

export default usePortal;
