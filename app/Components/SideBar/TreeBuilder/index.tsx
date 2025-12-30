import { Folder, Node } from "../../../Constants/types";
import { TreeNode } from "../Node";
import { NodeRow } from "../NodeRow";
import { TreeFolder } from "../Folder/index";
import { Spacer } from "../Spacer";

type TreeBuilderType = {
  data: Folder[];
};

export const TreeBuilder = (props: TreeBuilderType) => {
  const { data } = props;

  const renderFolder = (data: Folder, indentation = 0): React.ReactNode => {
    const folders = data.subfolders;
    const nodes = data.nodes;

    let nodesToRender: React.ReactNode = [];

    if (folders.length) {
      folders.forEach((folder) => {
        renderFolder(folder, indentation + 1);
      });
    }

    if (nodes.length) {
      nodesToRender = renderNodes(data.nodes, indentation);
    }

    return (
      <>
        <NodeRow>
          <Spacer indentation={indentation} />
          <TreeFolder label={data.name} />
        </NodeRow>
        {nodes && nodesToRender}
      </>
    );
  };

  const renderNodes = (data: Node[], indentation: number): React.ReactNode => {
    return (
      <>
        {data.map((node) => (
          <NodeRow key={node.id}>
            <Spacer indentation={indentation} />
            <TreeNode label={node.name} />
          </NodeRow>
        ))}
      </>
    );
  };

  return renderFolder(data[0]);
};


/// new approach, if I render a folder, and put the render folder logic inside of the folder itself, 
// each folder xan be responsible for its own children, including state where I can then open and close 
// each folder and show corresponding children accordigly, while being compartmentolized inside 
// of the given folder. A folder will render other folders with the same abilities, and nodes will ONLY 
// have logic to render themselves and then change the canvas when something is selected
