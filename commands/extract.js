exports.command = 'extract [files...]'
exports.aliases = ['x']
exports.desc = 'Extract a tarball archive.\n\nThe files are a list of paths to extract from the tarball. If no paths are provided, then all the entries are extracted. An entry in files that starts with an @ symbol is a tar archive whose entries will be added. To add a file that starts with @, prepend it with ./\n\nIf the archive is gzipped, then tar will detect this and unzip it.\n\nNote that all directories that are created will be forced to be writable, readable, and listable by their owner, to avoid cases where a directory prevents extraction of child entries by virtue of its mode.\n\nMost extraction errors will cause a warn event to be emitted. If the cwd is missing, or not a directory, then the extraction will fail completely.'
exports.handler = argv => argv.command = 'extract'
exports.builder = yargs => yargs
    .option('v', {
        alias: 'verbose',
        type: 'boolean'
    })
    .option('cwd', {
        type: 'string',
        default: process.cwd(),
        alias: ['C', 'directory'],
        desc: 'Extract files relative to the specified directory.'
    })
    .option('f', {
        alias: 'file',
        type: 'string',
        desc: 'The archive file to extract. If not specified one is read from STDIN.'
    })
    .option('strict', {
        type: 'boolean',
        desc: 'Treat warnings as crash-worthy errors.',
        default: false
    })
    .option('newer', {
        type: 'boolean',
        alias: ['keep-newer', 'keep-newer-files'],
        desc: "Set to true to keep the existing file on disk if it's newer than the file in the archive"
    })
    .option('keep', {
        type: 'boolean',
        alias: ['k', 'keep-existing'],
        desc: 'Do not overwrite existing files. In particular, if a file appears more than once in an archive, later copies will not overwrite earlier copies.'
    })
    .option('preserve-paths', {
        type: 'boolean',
        alias: 'P',
        desc: 'Allow absolute paths, paths containing .., and extracting through symbolic links. By default, / is stripped from absolute paths, .. paths are not extracted, and any file whose location would be modified by a symbolic link is not extracted. '
    })
    .option('unlink', {
        type: 'boolean',
        alias: ['U', 'unlink-first'],
        desc: 'Unlink files before creating them. Without this option, tar overwrites existing files, which preserves existing hardlinks. With this option, existing hardlinks will be broken, as will any symlink that would affect the location of an extracted file. '
    })
    .option('strip', {
        type: 'boolean',
        alias: [ 'strip-components', 'stripComponents' ],
        desc: 'Remove the specified number of leading path elements. Pathnames with fewer elements will be silently skipped. Note that the pathname is edited after applying the filter, but before security checks. ['
    })
    .option('preserve-owner', {
        type: 'boolean',
        alias: 'p',
        desc: 'If true, tar will set the uid and gid of extracted entries to the uid and gid fields in the archive. This defaults to true when run as root, and false otherwise. If false, then files and directories will be set with the owner and group of the user running the process. This is similar to -p in tar(1), but ACLs and other system-specific data is never unpacked in this implementation, and modes are set by default already.'
    })
    .option('uid', {
        type: 'number',
        desc: 'Set to a number to force ownership of all extracted files and folders, and all implicitly created directories, to be owned by the specified user id, regardless of the uid field in the archive. Cannot be used along with preserveOwner. Requires also setting a gid option.'
    })
    .option('gid', {
        type: 'number',
        desc: 'Set to a number to force ownership of all extracted files and folders, and all implicitly created directories, to be owned by the specified group id, regardless of the gid field in the archive. Cannot be used along with preserveOwner. Requires also setting a uid option.'
    })
    .option('no-mtime', {
        type: 'boolean',
        alias: 'm',
        desc: 'Set to true to omit writing mtime value for extracted entries.'
    })
    .option('no-chmod', {
        type: 'boolean',
        desc: 'Set to true to omit calling fs.chmod() to ensure that the extracted file matches the entry mode. This also suppresses the call to process.umask() to determine the default umask value, since tar will extract with whatever mode is provided, and let the process umask apply normally.'
    })
