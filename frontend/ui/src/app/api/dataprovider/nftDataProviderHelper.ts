
export function transformModelToDashboard<T>(
    model: T, id: number
): T & { id: number }//TODO - how to add a t that extend rarecord
{
    return {
        id,
        ...model
    }
}