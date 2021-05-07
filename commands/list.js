exports.command = 'list [files...]'
exports.aliases = ['t']
exports.desc = 'List the contents of a tarball archive.\n\nThe files are a list of paths to list from the tarball. If no paths are provided, then all the entries are listed. If the archive is gzipped, then tar will detect this and unzip it.'
exports.handler = argv => argv.command = 'list'
exports.builder = yargs => yargs
    .option('cwd', {
        type: 'string',
        default: process.cwd(),
        alias: ['C', 'directory'],
        desc: 'Extract files relative to the specified directory.'
    })
    .option('f', {
        alias: 'file',
        type: 'string',
        desc: 'The archive file to list. If not specified, then the file is read from STDIN.'
    })
    .option('strict', {
        type: 'boolean',
        desc: 'Treat warnings as crash-worthy errors.',
        default: false
    })
