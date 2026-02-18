// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { ChevronDown, ChevronRight } from "lucide-react";
// import { useState, memo } from "react";
// import type { ElementNode } from "../../shared/types/elementNode";
// import { getChildren, getDisplayName, resolveRef } from "../../lib/helper";
// import { useEditor } from "@/shared/hooks/editorProvider";

// const TreeNode = memo(
//   ({
//     path,
//     node,
//     definitions,
//     depth,
//   }: {
//     node: ElementNode;
//     definitions?: Record<string, any>;
//     depth: number;
//     path?: number;
//   }) => {
//     const { setSelectedElement } = useEditor();
//     const [open, setOpen] = useState(true);
//     if (!Object.keys(node).length) {
//       return <div>No list Created</div>;
//     }

//     const resolved = resolveRef(node.$ref, definitions);
//     const effectiveNode = resolved ?? node;

//     const children = getChildren(effectiveNode);
//     return (
//       <div>
//         <div
//           onClick={() => {
//             setOpen((v) => !v);
//             setSelectedElement(effectiveNode);
//           }}
//           style={{ paddingLeft: depth * 14 }}
//           className="flex items-center gap-2 py-1 cursor-pointer hover:bg-blue-50 rounded-md"
//         >
//           {children.length > 0 ? (
//             open ? (
//               <ChevronDown />
//             ) : (
//               <ChevronRight />
//             )
//           ) : null}

//           <span className="text-sm font-medium">
//             {getDisplayName(effectiveNode)}
//           </span>
//         </div>

//         {open &&
//           children.map((child, i) => (
//             <TreeNode
//               key={i}
//               node={child}
//               definitions={definitions}
//               depth={depth + 1}
//               path={i} ///nedeo to be correct
//             />
//           ))}
//       </div>
//     );
//   },
// );

// export default function ElementTimeline() {
//   const { data } = useEditor();
//   return (
//     <div className="h-full border-r bg-white">
//       <div className="p-2  h-[calc(100vh-64px)] overflow-y-scroll scrollbar-xs">
//         <TreeNode node={data} definitions={data.definitions} depth={0} />
//       </div>
//     </div>
//   );
// }
