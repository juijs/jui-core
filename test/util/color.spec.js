import jui from '../../dist/juijs.esm.js'

describe('/util/color.js', () => {
    const ColorUtil = jui.include('util.color');

    test('Check include module', () => {
        expect(ColorUtil).toBeDefined();
    });

    test('Check rgb method', () => {
        const rgb = ColorUtil.rgb('#FF0000');
        expect(rgb.r).toBe(255);
    });
})