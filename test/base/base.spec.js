import jui from '../../dist/juijs.esm.js'

describe('/base/base.js', () => {
    const TestUtil = jui.include('util.test');

    test('Check undefined module', () => {
        expect(TestUtil).toBeNull();
    });
})