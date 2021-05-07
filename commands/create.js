exports.command = 'create <files...>'
exports.aliases = ['c']
exports.desc = 'Create a tarball archive.\n\nThe files are a list of paths to add to the tarball. Adding a directory also adds its children recursively.\n\nAn entry in files that starts with an @ symbol is a tar archive whose entries will be added. To add a file that starts with @, prepend it with ./'

exports.handler = argv => {
    argv.command = 'create'
    argv.noDirRecurse = !argv.recursion
    argv.follow = argv.dereference
    for (const mtime of Array.from(argv.mtime || [])) {
        if (mtime === false) {
            argv.noMtime = true
        } else if (mtime != null) {
            argv.mtime = new Date(mtime)
        }
    }
}
exports.builder = yargs => yargs
    .option('v', {
        alias: 'verbose',
        type: 'boolean'
    })
    .option('f', {
        alias: 'file',
        type: 'string',
        desc: 'Write the tarball archive to the specified filename. If not specified then it is written to STDOUT.'
    })
    .option('strict', {
        type: 'boolean',
        desc: 'Treat warnings as crash-worthy errors.',
        default: false
    })
    .option('cwd', {
        type: 'string',
        default: process.cwd(),
        alias: ['C', 'directory'],
        desc: 'The current working directory for creating the archive.'
    })
    .option('prefix', {
        type: 'string',
        desc: 'A path portion to prefix onto the entries in the archive.'
    })
    .option('z', {
        alias: 'gzip',
        type: 'boolean',
        default: 'false',
        desc: 'Compress the archive with gzip'
    })
    .option('portable', {
        type: 'boolean',
        desc: 'Omit metadata that is system-specific: ctime, atime, uid, gid, uname, gname, dev, ino, and nlink. Note that mtime is still included, because this is necessary for other time-based operations. Additionally, mode is set to a "reasonable default" for most unix systems, based on a umask value of 0o22.'
    })
    .option('preserve-paths', {
        type: 'boolean',
        alias: ['P', 'absolute-names'],
        desc: 'Allow absolute paths. By default, / is stripped from absolute paths.'
    })
    .option('mode', {
        type: 'string',
        desc: 'The mode to set on the created file archive'
    })
    .option('recursion', {
        type: 'boolean',
        default: 'true',
        desc: 'Recursively archive the contents of directories. Disable with --no-recursion'
    })
    .option('dereference', {
        alias: ['L', 'h'],
        type: 'boolean',
        desc: 'Set to true to pack the targets of symbolic links. Without this option, symbolic links are archived as such.'
    })
    .option('pax', {
        type: 'boolean',
        default: true,
        desc: 'Suppress pax extended headers. Note that this means that long paths and linkpaths will be truncated, and large or negative numeric values may be interpreted incorrectly.'
    })
    .option('no-mtime', {
        type: 'boolean',
        alias: ['m'],
        default: false,
        desc: 'Set to true to omit writing mtime values for entries. Note that this prevents using other mtime-based features like tar.update or the keepNewer option with the resulting tar archive.'
    })
    .option('mtime', {
        type: 'string',
        desc: 'Set to a date to force a specific mtime for everything added to the archive. Overriden by --no-mtime. String should be a valid argument for the Date object constructor.'
    })
