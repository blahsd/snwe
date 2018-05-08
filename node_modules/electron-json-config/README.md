# electron-json-config

> Simply set and get configuration from a json file for your Electron app

The config file (`config.json`) is located in the path returned by `app.getPath('userData')`.
This package can be used from **browser and renderer** process.

## Usage

```js
const config = require('electron-json-config');

config.set('foo', 'bar');
console.log(config.get('foo')); // shows 'bar'
```


## Documentation

*All `key` can be a classic key (eg: `foo`) or a multiple level key with levels separated by `.` (eg: `foo.bar`)*


### `.file()`
Returns the name of the file the config is stored in.  
**Returns:** [String]


### `.set(key, value)`
Sets a key with the specified value. Overwrites the value, if the key already exists..

| Parameters | Type     | Optional | Description                         |
|:----------:|:--------:|:--------:|:-----------------------------------:|
| key        | [String] |          | The key to set                      |
| value      | *        |          | The value to set under the key      |

**Returns:** void  
**Example:**
```js
config.set('foo', 'bar'); // Sets 'bar' under 'foo' key
config.set('anArray', [1, 2]); // Sets [1, 2] under 'anArray' key
config.set('the.answer', 42); // Sets 42 under 'answer' under 'the'
```


### `.setBulk(items)`
Like `.set()` but sets multiple keys in a single call.

| Parameters | Type     | Optional | Description                                 |
|:----------:|:--------:|:--------:|:-------------------------------------------:|
| items      | [Object] |          | An object whose attributes will become keys |

**Returns:** void  
**Example:**
```js
// Sets 'bar' under 'foo' key
// Sets 42 under 'answer' under 'the'
config.setBulk({
  'foo': 'bar',
  'the.answer': 42,
});
```


### `.has(key)`
Checks if a key exists.

| Parameters | Type     | Optional | Description                         |
|:----------:|:--------:|:--------:|:-----------------------------------:|
| key        | [String] |          | The name of a key to test existence |

**Returns:** [Boolean]  
**Example:**
```js
config.set('foo', 'bar');

config.has('foo'); // true
config.has('bar'); // false
```


### `.get(key[, defaultValue])`
Returns the value associated with the key, `undefined` otherwise.  
You can specify a default value returned in case the key does not exists.

| Parameters   | Type     | Optional | Description                                       |
|:------------:|:--------:|:--------:|:-------------------------------------------------:|
| key          | [String] |          | The name of the key to get                        |
| defaultValue | *        | ✓        | The value to return in case value does not exists |

**Returns:** \*  
**Example:**
```js
config.set('foo', 'bar'); // Sets 'bar' under 'foo' key

config.get('foo');        // Returns 'bar'
config.get('bar', 42);    // Returns 42
```


### `.keys([key])`
If `key` is omitted, returns an array containing all keys in the config file.  
If `key` is provided, returns an array containing all sub keys in the `key` object.

| Parameters | Type     | Optional | Description                       |
|:----------:|:--------:|:--------:|:---------------------------------:|
| key        | [String] | ✓        | The name of a key to get sub keys |

**Returns:** [Array]<[String]>  
**Example:**
```js
config.setBulk({
  'foo': 'bar',
  'the.answer': 42,
});

config.keys();      // Returns ['foo', 'the']
config.keys('the'); // Returns ['answer']
```

### `.all()`
Returns an object with all the data currently saved.

**Returns:** [Object]  
**Example:**
```js
config.setBulk({
  'foo': 'bar',
  'the.answer': 42,
});

config.all();
/*
{
  'foo': 'bar',
  'the': {
    'answer': 42
  }
}
*/
```


### `.delete(key)`
Removes the key and its value from the config file.

| Parameters | Type     | Optional | Description                 |
|:----------:|:--------:|:--------:|:---------------------------:|
| key        | [String] |          | The name of a key to delete |

**Returns:** void  
**Example:**
```js
config.set('foo', 'bar'); // Sets 'bar' under 'foo' key
config.delete('foo');     // Removes key 'bar' and its value
```


### `.deleteBulk(keys)`
Removes all the keys specified and theirs value from the config file.

| Parameters | Type              | Optional | Description                |
|:----------:|:-----------------:|:--------:|:--------------------------:|
| keys       | [Array]<[String]> |          | An array of keys to remove |

**Returns:** void  
**Example:**
```js
config.setBulk({
  'foo': 'bar',
  'the.answer': 42,
});

// Remove keys 'foo' and 'answer'
config.deleteBulk(['foo', 'answer']);
```


### `.purge()`
Removes all data from the config file.

**Returns:** void  
**Example:**
```js
config.purge(); // All keys are removed
```


[String]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[Boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
