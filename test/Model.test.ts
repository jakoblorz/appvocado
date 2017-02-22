import * as mocha from 'mocha';
import { Model } from '../lib/Model';

describe('Testing Model Implementation', () => {
    class TestModel extends Model {
        constructor(){
            super({
                properties : {
                    name : { type : 'string' },
                    age : { type : 'number' }
                },
                required : [ 'name' ]
            });
        }
    }

    it('should not validate json with number instead of string', (next) => {
        let t = new TestModel();
        let isValid = t.validate({
            name : 42,
            age : 42
        });

        if(isValid) throw new Error('validation failed: expected string but recieved number');
        else next();
    });

    it('should not validate json with string instead of number', (next) => {
        let t = new TestModel();
        let isValid = t.validate({
            name : 'Foo',
            age : 'Bar'
        });

        if (isValid) throw new Error('validation failed: expected string but recieved number');
        else next();
    });

    it('should not validate json with missing required field', (next) => {
        let t = new TestModel();
        let isValid = t.validate({
            age : 42
        });

        if (isValid) throw new Error('validation failed: expected string but recieved number');
        else next();
    });
});