import * as dotWild from "dot-wild";

/**
 * Remaps the data based on the provided remapping definition.
 * @param jsonData - The JSON data to be remapped.
 * @param remappingDefinition - The remapping definition object.
 * @param reverse - Flag indicating whether to perform reverse remapping. Default is false.
 * @returns The remapped data.
 */
const remap = (
  jsonData: object | object[],
  remappingDefinition: Record<string, string>,
  options: {
    reverse?: boolean;
    deleteMappedValues?: boolean;
    deleteEmptyParents?: boolean;
    keepUnmappedValues?: boolean;
  } = {}
): object | object[] => {
  // If jsonData is null or undefined, return null
  if (jsonData === null || jsonData === undefined) return null;
  const {
    reverse = false,
    deleteMappedValues = true,
    deleteEmptyParents = true,
    keepUnmappedValues = true,
  } = options;

  let remappedData;
  if (keepUnmappedValues) {
    remappedData = jsonData;
  } else if (Array.isArray(jsonData)) {
    remappedData = [];
  } else {
    remappedData = {};
  }

  // Iterate over each key in the remapping definition
  Object.keys(remappingDefinition).forEach((key) => {
    // Determine the source and target paths based on the reverse flag
    const sourcePath = reverse ? remappingDefinition[key] : key;
    const targetPath = reverse ? key : remappingDefinition[key];

    // Get the value from the source path in the remapped data
    const sourceValue = dotWild.get(
      keepUnmappedValues ? remappedData : jsonData,
      sourcePath
    );

    // If the source value exists
    if (sourceValue !== undefined) {
      // Set the source value at the target path in the remapped data
      if (Array.isArray(sourceValue) && targetPath.includes("*")) {
        sourceValue.forEach((value, index) => {
          const updatedTargetPath = targetPath.replace("*", index.toString());
          remappedData = dotWild.set(remappedData, updatedTargetPath, value);
        });
      } else {
        remappedData = dotWild.set(remappedData, targetPath, sourceValue);
      }

      // if keepUnmappedValues && deleteMappedValues, remove sourcePath and empty parent structures
      if (keepUnmappedValues && deleteMappedValues) {
        // Remove the source path from the remapped data
        remappedData = dotWild.remove(remappedData, sourcePath);

        if (deleteEmptyParents) {
          // Recursively check and remove empty parent objects/arrays
          let parentPath = sourcePath.substring(
            0,
            sourcePath.includes(".") ? sourcePath.lastIndexOf(".") : 0
          );
          while (parentPath && parentPath !== "") {
            const parentValue = dotWild.get(remappedData, parentPath);

            // If the parent value is an empty array, add remove
            if (Array.isArray(parentValue) && parentValue.length === 0) {
              remappedData = dotWild.remove(remappedData, parentPath);
              // If the parent value is an empty object, add remove
            } else if (
              typeof parentValue === "object" &&
              Object.keys(parentValue).length === 0
            ) {
              remappedData = dotWild.remove(remappedData, parentPath);
            }

            // Update the parent path to check the next level
            parentPath = parentPath.includes(".")
              ? parentPath.substring(0, parentPath.lastIndexOf("."))
              : "";
          }
        }
      }
    }
  });

  return remappedData;
};

export default remap;
