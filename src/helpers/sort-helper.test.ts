import {expect} from 'chai';
import {sortObjectsByKeyRanking} from "./sort.helper";

describe('Sort Helper', () => {
  describe('Sort objects by key ranking', () => {
    it('Should return equal object', () => {
      const ranking = ["first", "second", "third"];
      const obj = {
        second: "foo",
        third: "bar",
        first: {
          baz: "baz"
        }
      }


      const expectObj = {
        first: {
          baz: "baz"
        },
        second: "foo",
        third: "bar",
      };

      expect(sortObjectsByKeyRanking(obj, ranking)).to.eql(expectObj);
    });

    it('Should return sorted object keys by provided ranking', () => {
      const ranking = ["first", "second", "third"];
      const obj = {
        second: "foo",
        third: "bar",
        first: {
          baz: "baz"
        }
      }

      expect(Object.keys(sortObjectsByKeyRanking(obj, ranking))).to.eql(ranking);
    });

    it("Should throw error on length of ranking not equal to object keys length", () => {
      const ranking = ["first", "second", "third"]
      const object = {
        second: "foo",
        third: "bar",
        first: {
          baz: "baz"
        },
        fourth: "qux"
      }

      expect(() => sortObjectsByKeyRanking(object, ranking)).to.throw("Ranking has to be provided for every key")
    });

    it("Should throw error on duplicate key", () => {
      const ranking = ["first", "second", "qux",]
      const object = {
        second: "foo",
        third: "bar",
        first: {
          baz: "baz"
        },
      }

      expect(() => sortObjectsByKeyRanking(object, ranking)).to.throw("Invalid or missing keys in ranking")
    });
  });
});


