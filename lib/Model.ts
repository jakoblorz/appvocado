/**
 * MIT License
 *
 * Copyright (c) 2017 Jakob Lorz (https://github.com/jakoblorz)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import * as ajv from 'ajv';
import { JsonSchema } from './Schema';

export class Model {

    /**
     * used to validate json schemas
     */
    private ajvValidate : any;

    /**
     * the inserted ajv schema against which the validation
     * is being done
     */
    public schema : JsonSchema;

    /**
     * constructor. create a new validation model
     * @param schema ajv model 'blueprint'
     */
    constructor(schema : JsonSchema){
        this.schema = schema;
        this.ajvValidate = ajv().compile(this.schema);
    }

    /**
     * validate
     * @param test json schema to validate against blueprint
     */
    public validate(test : any) : boolean{
        return this.ajvValidate(test);
    }
}