import assert from 'assert';
import less from 'less';

class FileManager extends less.FileManager {
  constructor(rules) {
    super();

    rules.forEach((item) => {
      assert(
        (
          Array.isArray(item)
          && (typeof item[0] === 'string' || item[0] instanceof RegExp || typeof item[0] === 'function')
          && (typeof item[1] === 'string' || typeof item[1] === 'function')
        ),
        'rules should be Array<[string | regexp | function, string | function]>',
      );
    });

    this.rules = rules;
  }

  async loadFile(filename, ...args) {
    for (let i = 0, l = this.rules.length; i < l; i++) {
      const [m, r] = this.rules[i];

      if (
        (typeof m === 'string' && filename === m)
        || (m instanceof RegExp && m.test(filename))
        || (typeof m === 'function' && m(filename))
      ) {
        filename = typeof r === 'string' ? r : r(filename);
      }
    }

    const result = await super.loadFile(filename, ...args);
    return result;
  }
}

class Plugin {
  constructor(options = {}) {
    assert(options instanceof Object, 'options should be object');
    const rules = options.rules ?? [];
    assert(Array.isArray(rules), 'options.rules should be array');

    this.rules = rules;
  }

  minVersion = [3, 0, 0]

  install = (lessInstance, pluginManager) => {
    pluginManager.addFileManager(new FileManager(this.rules));
  }
}

module.exports = Plugin;
