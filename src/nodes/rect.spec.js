import Rect from "./rect";
import { traverse } from "../core";
import { createElement } from "../create-element";
import { createClock } from "../clock";

const getTime = () => 500;
const clock = createClock(getTime);
const lifecycles = {
  mounted: () => {},
  unmounted: () => {},
};
const config = { clock, lifecycles };

const configuredTraverse = traverse(config);

describe("Rect", () => {
  test("It should have a Rect function", () => {
    expect(typeof Rect).toBe("function");
  });

  test("The Rect function should build a rect js object", () => {
    const expected = {
      _resolve: expect.anything(),
      _instance: expect.anything(),
      type: Rect,
      props: {
        x: 0,
        y: 0,
        z: 0,
        width: 5,
        height: 5,
      },
      children: [
        {
          type: "RECT",
          x: 0,
          y: 0,
          z: 0,
          width: 5,
          height: 5,
          onClick: undefined,
          children: [],
          _instance: expect.anything(),
        },
      ],
    };

    const actual = configuredTraverse(
      null,
      createElement(Rect, {
        x: 0,
        y: 0,
        z: 0,
        width: 5,
        height: 5,
      })
    );

    expect(actual).toEqual(expected);
  });

  test("The Rect function should take children", () => {
    const expected = {
      _resolve: expect.anything(),
      _instance: expect.anything(),
      type: Rect,
      props: {
        x: 0,
        y: 0,
        z: 0,
        width: 5,
        height: 5,
      },
      children: [
        {
          _instance: expect.anything(),
          type: "RECT",
          x: 0,
          y: 0,
          z: 0,
          width: 5,
          height: 5,
          onClick: undefined,
          children: [
            {
              _resolve: expect.anything(),
              _instance: expect.anything(),
              type: Rect,
              props: {
                x: 0,
                y: 0,
                z: 0,
                width: 15,
                height: 15,
              },
              children: [
                {
                  _instance: expect.anything(),
                  type: "RECT",
                  x: 0,
                  y: 0,
                  z: 0,
                  width: 15,
                  height: 15,
                  onClick: undefined,
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    };

    const actual = configuredTraverse(
      null,
      createElement(
        Rect,
        {
          x: 0,
          y: 0,
          z: 0,
          width: 5,
          height: 5,
        },
        [createElement(Rect, { x: 0, y: 0, z: 0, width: 15, height: 15 })]
      )
    );
    expect(actual).toEqual(expected);
  });

  test("The node functions should be able to render custom logic nodes", () => {
    const CustomNode = (props) =>
      createElement(Rect, {
        x: props.x / 2,
        y: props.y / 2,
        z: props.z / 2,
        width: props.width / 2,
        height: props.height / 2,
      });

      const expected = {
        _resolve: expect.anything(),
        _instance: expect.anything(),
        type: CustomNode,
        props: {
          x: 2,
          y: 2,
          z: 2,
          width: 10,
          height: 10,
        },
        children: [
          {
            _resolve: expect.anything(),
            _instance: expect.anything(),
            type: Rect,
            props: {
              x: 1,
              y: 1,
              z: 1,
              width: 5,
              height: 5,
            },
            children: [
              {
                _instance: expect.anything(),
                type: "RECT",
                x: 1,
                y: 1,
                z: 1,
                width: 5,
                height: 5,
                children: [],
              },
            ],
          },
        ],
      };

    const actual = configuredTraverse(
      null,
      createElement(CustomNode, {
        x: 2,
        y: 2,
        z: 2,
        width: 10,
        height: 10,
      })
    );

    expect(actual).toEqual(expected);
  });
});
