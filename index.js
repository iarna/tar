#!/usr/bin/env node
'use strict'
const tar = require('tar')
const yargs = require('@iarna/cli')(main)
    .commandDir('commands')
    .demandCommand()
    .help()

async function main (opts) {
    if (!opts.command) {
        yargs.showHelp()
        /* eslint-disable no-throw-literal */
        throw 1
    }
    let tarOpts = {
        ...opts,
        sync: true,
        onwarn: (code, message, data) => {
            console.error(`[${code}] ${message}`)
        }
    }

    if (opts.command === 'create') {
        if (opts.verbose) {
            tarOpts = {
                ...tarOpts,
                filter: path => {
                   console.log(path)
                   return true
                }
            }
        }
        if (opts.file) {
            tar.c(tarOpts, opts.files)
        } else {
            const output = tar.c(tarOpts, opts.files)
            output.pipe(process.stdout)
            return new Promise((resolve, reject) => {
                output.on('error', reject)
                output.on('end', resolve)
            })
        }
    } else if (opts.command === 'extract') {
        if (opts.verbose) {
            tarOpts = {
                ...tarOpts,
                filter: path => {
                   console.log(path)
                   return true
                }
            }
        }
        if (opts.file) {
            tar.x(tarOpts, opts.files)
        } else {
            const input = tar.x(tarOpts, opts.files)
            process.stdin.pipe(input)
            return new Promise((resolve, reject) => {
                input.on('error', reject)
                input.on('finish', resolve)
            })
        }
    } else if (opts.command === 'list') {
        tarOpts = {
            ...tarOpts,
            onentry: entry => {
                console.log(entry.path)
            }
        }
        if (opts.file) {
            tar.t(tarOpts, opts.files)
        } else {
            const input = tar.t(tarOpts, opts.files)
            process.stdin.pipe(input)
            return new Promise((resolve, reject) => {
                input.on('error', reject)
                input.on('finish', resolve)
            })
      }
    }
}
