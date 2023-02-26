export const getResourceName = (resourcePartialName: string): string => {
    const resourceName = `${resourcePartialName}-${process.env.ENV}`

    return resourceName;
}