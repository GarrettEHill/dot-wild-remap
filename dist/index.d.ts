/**
 * Remaps the data based on the provided remapping definition.
 * @param jsonData - The JSON data to be remapped.
 * @param remappingDefinition - The remapping definition object.
 * @param reverse - Flag indicating whether to perform reverse remapping. Default is false.
 * @returns The remapped data.
 */
declare const remap: (jsonData: object | object[], remappingDefinition: Record<string, string>, options?: {
    reverse?: boolean;
    deleteMappedValues?: boolean;
    deleteEmptyParents?: boolean;
    keepUnmappedValues?: boolean;
}) => object | object[];

export { remap as default };
