module.exports = {
    "middlewares": {
        "summary": [
            "summary?sourcePattern=build/messages/**/*.json"
        ],
        "process": [
            "fetchLocal?source=locales,skip",
            "metaToResult?from=defaultMessage,to=ru",
            "google?from='en',to='ru'",
            "reduce?-autoPick,autoReduce[]=local,autoReduce[]=meta"
        ],
        "emit": [
            "save?dest=locales"
        ]
    }
}