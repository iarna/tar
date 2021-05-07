# @iarna/tar

A simple tar CLI based on node-tar -- highly compatible, very fast, can
produce idempotent tar outputs when using "portable" mode.

Intended for use in environments without a tar binary (ie, Windows),
particularly for portable package.json run scripts.

## USAGE

```console
Commands:
  npx @iarna/tar@1 create <files...>   Create a tarball archive.

                               The files are a list of paths to add to the
                               tarball. Adding a directory also adds its
                               children recursively.

                               An entry in files that starts with an @ symbol is
                               a tar archive whose entries will be added. To add
                               a file that starts with @, prepend it with ./
                                                                    [aliases: c]
  npx @iarna/tar@1 extract [files...]  Extract a tarball archive.

                               The files are a list of paths to extract from the
                               tarball. If no paths are provided, then all the
                               entries are extracted. An entry in files that
                               starts with an @ symbol is a tar archive whose
                               entries will be added. To add a file that starts
                               with @, prepend it with ./

                               If the archive is gzipped, then tar will detect
                               this and unzip it.

                               Note that all directories that are created will
                               be forced to be writable, readable, and listable
                               by their owner, to avoid cases where a directory
                               prevents extraction of child entries by virtue of
                               its mode.

                               Most extraction errors will cause a warn event to
                               be emitted. If the cwd is missing, or not a
                               directory, then the extraction will fail
                               completely.                          [aliases: x]
  npx @iarna/tar@1 list [files...]     List the contents of a tarball archive.

                               The files are a list of paths to list from the
                               tarball. If no paths are provided, then all the
                               entries are listed. If the archive is gzipped,
                               then tar will detect this and unzip it.

```

This is a thin wrapper around node-tar -- basically just the docs converted
into yargs options so you can use it as a cli.  A few extra aliases to match
GNU tar.

### npx @iarna/tar@1 create [options] <files...>

```
Create a tarball archive.

The files are a list of paths to add to the tarball. Adding a directory also
adds its children recursively.

An entry in files that starts with an @ symbol is a tar archive whose entries
will be added. To add a file that starts with @, prepend it with ./

Options:
      --version                           Show version number          [boolean]
      --help                              Show help                    [boolean]
  -v, --verbose                                                        [boolean]
  -f, --file                              Write the tarball archive to the
                                          specified filename. If not specified
                                          then it is written to STDOUT. [string]
      --strict                            Treat warnings as crash-worthy errors.
                                                      [boolean] [default: false]
  -C, --cwd, --directory                  The current working directory for
                                          creating the archive.
                                     [string] [default: "/mnt/c/code/iarna-tar"]
      --prefix                            A path portion to prefix onto the
                                          entries in the archive.       [string]
  -z, --gzip                              Compress the archive with gzip
                                                    [boolean] [default: "false"]
      --portable                          Omit metadata that is system-specific:
                                          ctime, atime, uid, gid, uname, gname,
                                          dev, ino, and nlink. Note that mtime
                                          is still included, because this is
                                          necessary for other time-based
                                          operations. Additionally, mode is set
                                          to a "reasonable default" for most
                                          unix systems, based on a umask value
                                          of 0o22.                     [boolean]
  -P, --preserve-paths, --absolute-names  Allow absolute paths. By default, / is
                                          stripped from absolute paths.[boolean]
      --mode                              The mode to set on the created file
                                          archive                       [string]
      --recursion                         Recursively archive the contents of
                                          directories. Disable with
                                          --no-recursion
                                                     [boolean] [default: "true"]
  -L, -h, --dereference                   Set to true to pack the targets of
                                          symbolic links. Without this option,
                                          symbolic links are archived as such.
                                                                       [boolean]
      --pax                               Suppress pax extended headers. Note
                                          that this means that long paths and
                                          linkpaths will be truncated, and large
                                          or negative numeric values may be
                                          interpreted incorrectly.
                                                       [boolean] [default: true]
  -m, --no-mtime                          Set to true to omit writing mtime
                                          values for entries. Note that this
                                          prevents using other mtime-based
                                          features like tar.update or the
                                          keepNewer option with the resulting
                                          tar archive.[boolean] [default: false]
      --mtime                             Set to a date to force a specific
                                          mtime for everything added to the
                                          archive. Overriden by --no-mtime.
                                          String should be a valid argument for
                                          the Date object constructor.  [string]
```

### npx @iarna/tar@1 extract [options] <files...>

```console
Extract a tarball archive.

The files are a list of paths to extract from the tarball. If no paths are
provided, then all the entries are extracted. An entry in files that starts with
an @ symbol is a tar archive whose entries will be added. To add a file that
starts with @, prepend it with ./

If the archive is gzipped, then tar will detect this and unzip it.

Note that all directories that are created will be forced to be writable,
readable, and listable by their owner, to avoid cases where a directory prevents
extraction of child entries by virtue of its mode.

Most extraction errors will cause a warn event to be emitted. If the cwd is
missing, or not a directory, then the extraction will fail completely.

Options:
      --version                             Show version number        [boolean]
      --help                                Show help                  [boolean]
  -v, --verbose                                                        [boolean]
  -C, --cwd, --directory                    Extract files relative to the
                                            specified directory.
                                     [string] [default: "/mnt/c/code/iarna-tar"]
  -f, --file                                The archive file to extract. If not
                                            specified one is read from STDIN.
                                                                        [string]
      --strict                              Treat warnings as crash-worthy
                                            errors.   [boolean] [default: false]
      --newer, --keep-newer,                Set to true to keep the existing
      --keep-newer-files                    file on disk if it's newer than the
                                            file in the archive        [boolean]
  -k, --keep, --keep-existing               Do not overwrite existing files. In
                                            particular, if a file appears more
                                            than once in an archive, later
                                            copies will not overwrite earlier
                                            copies.                    [boolean]
  -P, --preserve-paths                      Allow absolute paths, paths
                                            containing .., and extracting
                                            through symbolic links. By default,
                                            / is stripped from absolute paths,
                                            .. paths are not extracted, and any
                                            file whose location would be
                                            modified by a symbolic link is not
                                            extracted.                 [boolean]
  -U, --unlink, --unlink-first              Unlink files before creating them.
                                            Without this option, tar overwrites
                                            existing files, which preserves
                                            existing hardlinks. With this
                                            option, existing hardlinks will be
                                            broken, as will any symlink that
                                            would affect the location of an
                                            extracted file.            [boolean]
      --strip, --strip-components,          Remove the specified number of
      --stripComponents                     leading path elements. Pathnames
                                            with fewer elements will be silently
                                            skipped. Note that the pathname is
                                            edited after applying the filter,
                                            but before security checks. [
                                                                       [boolean]
  -p, --preserve-owner                      If true, tar will set the uid and
                                            gid of extracted entries to the uid
                                            and gid fields in the archive. This
                                            defaults to true when run as root,
                                            and false otherwise. If false, then
                                            files and directories will be set
                                            with the owner and group of the user
                                            running the process. This is similar
                                            to -p in tar(1), but ACLs and other
                                            system-specific data is never
                                            unpacked in this implementation, and
                                            modes are set by default already.
                                                                       [boolean]
      --uid                                 Set to a number to force ownership
                                            of all extracted files and folders,
                                            and all implicitly created
                                            directories, to be owned by the
                                            specified user id, regardless of the
                                            uid field in the archive. Cannot be
                                            used along with preserveOwner.
                                            Requires also setting a gid option.
                                                                        [number]
      --gid                                 Set to a number to force ownership
                                            of all extracted files and folders,
                                            and all implicitly created
                                            directories, to be owned by the
                                            specified group id, regardless of
                                            the gid field in the archive. Cannot
                                            be used along with preserveOwner.
                                            Requires also setting a uid option.
                                                                        [number]
  -m, --no-mtime                            Set to true to omit writing mtime
                                            value for extracted entries.
                                                                       [boolean]
      --no-chmod                            Set to true to omit calling
                                            fs.chmod() to ensure that the
                                            extracted file matches the entry
                                            mode. This also suppresses the call
                                            to process.umask() to determine the
                                            default umask value, since tar will
                                            extract with whatever mode is
                                            provided, and let the process umask
                                            apply normally.            [boolean]
```

### npx @iarna/tar@1 list [options] <files...>

```console
List the contents of a tarball archive.

The files are a list of paths to list from the tarball. If no paths are
provided, then all the entries are listed. If the archive is gzipped, then tar
will detect this and unzip it.

Options:
      --version           Show version number                          [boolean]
      --help              Show help                                    [boolean]
  -C, --cwd, --directory  Extract files relative to the specified directory.
                                     [string] [default: "/mnt/c/code/iarna-tar"]
  -f, --file              The archive file to list. If not specified, then the
                          file is read from STDIN.                      [string]
      --strict            Treat warnings as crash-worthy errors.
                                                      [boolean] [default: false]
```
