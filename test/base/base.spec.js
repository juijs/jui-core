import jui from '../../src/main.js'

describe('/base/base.js', () => {
    const TestUtil = jui.include('util.test');

    test('Check undefined module', () => {
        expect(TestUtil).toBeNull();
    });
})