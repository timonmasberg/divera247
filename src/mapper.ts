import { sortObjectsByKeyRanking } from './helpers/sort.helper';

export abstract class Mapper<
  ApiResultType extends Record<string, unknown>,
  MappedType,
> {
  protected _data: ApiResultType;

  protected constructor(data: ApiResultType) {
    this._data = data;
  }

  sort(keyRanking: string[]): Mapper<ApiResultType, MappedType> {
    this._data = sortObjectsByKeyRanking<ApiResultType>(this._data, keyRanking);
    return this;
  }

  abstract getAsMapped(): MappedType;
}
