import {expect} from "chai";
import {getPropertyValueByPath} from "./get-property-value-by-path.helper";


describe('Get property value by path helper', () => {
  it('Should return primitive value of provided path', () => {
    const foo = "bar";
    const obj = {
      foo
    };

    expect(getPropertyValueByPath(obj, "foo")).to.be.equal(foo);
  });

  it('Should return object value of provided path', () => {
    const foo = {
      bar: "foobar"
    };

    const obj = {
      foo
    }

    expect(getPropertyValueByPath(obj, "foo")).to.be.equal(foo);
  });

  it('Should return nested property value of provided path', () => {
    const qux = {
      quux: "quux",
      corge: {
        grault: "grault",
        garply: "garply"
      }
    }

    const obj = {
      foo: {
        bar: {
          baz: "",
          qux
        },
        waldo: ""
      }
    };


    expect(getPropertyValueByPath(obj, "foo", "bar", "qux")).to.be.equal(qux);
  });

  it('Should return null', () => {
    const obj = {
      foo: {
        bar: "bar"
      }
    }

    expect(getPropertyValueByPath(obj, "baz")).to.be.null;
  });
})
