import util from "util";
import { exec as execCb } from "child_process";
import { join } from "path";

const exec = util.promisify(execCb);

export const printTree = async (tree, filepath = join("build", "tree.png")) => {
  const printNode = (node) => `${node.data} -> {${node.children.join(",")}}`;

  const graph = `digraph { ${tree.map(printNode).join("; ")} }`;

  await exec(`echo '${graph}' | dot -T png -o ${filepath}`);
};
