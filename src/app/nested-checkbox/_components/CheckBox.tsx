"use client";
import React, { useRef, useEffect } from "react";

type Node = {
  id: string | number;
  label: string;
  children?: Node[];
};

interface Props {
  nestedCheckbox: Node[];
  checkData: (string | number)[];
  setCheckedData: React.Dispatch<React.SetStateAction<(string | number)[]>>;
}

const CheckBox: React.FC<Props> = ({ nestedCheckbox, checkData, setCheckedData }) => {
  // Toggle entire branch
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    node: Node
  ) => {
    const ids = collectAllIds(node);

    if (e.target.checked) {
      setCheckedData((prev) => [...new Set([...prev, ...ids])]);
    } else {
      setCheckedData((prev) => prev.filter((id) => !ids.includes(id)));
    }
  };

  // Recursively gather IDs
  const collectAllIds = (node: Node): (string | number)[] => {
    const ids = [node.id];
    node.children?.forEach((c) => ids.push(...collectAllIds(c)));
    return ids;
  };

  // Determine if *all* descendants of a node are checked
  const isFullyChecked = (node: Node): boolean => {
    return collectAllIds(node).every((id) => checkData.includes(id));
  };

  // Determine if *some* descendants are checked
  const isPartiallyChecked = (node: Node): boolean => {
    const ids = collectAllIds(node);
    const checkedCount = ids.filter((id) => checkData.includes(id)).length;
    return checkedCount > 0 && checkedCount < ids.length;
  };

  return (
    <div>
      {nestedCheckbox.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          checkData={checkData}
          setCheckedData={setCheckedData}
          isFullyChecked={isFullyChecked}
          isPartiallyChecked={isPartiallyChecked}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
};

// Separate component so we can attach `indeterminate` easily
const TreeNode: React.FC<{
  node: Node;
  checkData: (string | number)[];
  setCheckedData: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  isFullyChecked: (n: Node) => boolean;
  isPartiallyChecked: (n: Node) => boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, n: Node) => void;
}> = ({ node, checkData, setCheckedData, isFullyChecked, isPartiallyChecked, handleChange }) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  // Set the `indeterminate` property after render
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isPartiallyChecked(node);
    }
  }, [checkData, node, isPartiallyChecked]);

  return (
    <div className="ml-4">
      <input
        ref={checkboxRef}
        type="checkbox"
        checked={isFullyChecked(node)}
        onChange={(e) => handleChange(e, node)}
      />
      <label>{node.label}</label>

      {node.children && (
        <CheckBox
          nestedCheckbox={node.children}
          checkData={checkData}
          setCheckedData={setCheckedData}
        />
      )}
    </div>
  );
};

export default CheckBox;
