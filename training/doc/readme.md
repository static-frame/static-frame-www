[![Logo](_static/sf-logo-web_icon-small.png)](index.md)

Quick Start

* static-frame
  + [Installation via `pip`](#installation-via-pip)
  + [Installation via `conda`](#installation-via-conda)
  + [Installation via Pyodide](#installation-via-pyodide)
  + [Dependencies](#dependencies)
  + [Quick-Start Guide](#quick-start-guide)
* [License](license.md)

Introduction

* [About StaticFrame](intro.md)
* [Media](intro.md#media)
* [What is New in StaticFrame](new.md)
* [Contributing](contributing.md)

Articles

* [Improving Code Quality with Array and DataFrame Type Hints](articles/guard.md)
* [Type-Hinting DataFrames for Static Analysis and Runtime Validation](articles/ftyping.md)
* [Faster DataFrame Serialization](articles/serialize.md)
* [The Performance Advantage of No-Copy DataFrame Operations](articles/no_copy.md)
* [Memoizing DataFrame Functions: Using Hashable DataFrames and Message Digests to Optimize Repeated Calculations](articles/hash.md)
* [Using Higher-Order Containers to Efficiently Process 7,163 (or More) DataFrames](articles/uhoc.md)
* [One Fill Value Is Not Enough: Preserving Columnar Types When Reindexing DataFrames](articles/fill_value.md)
* [Ten Reasons to Use StaticFrame Instead of Pandas](articles/upgrade.md)
* [Boring Indices & Where to Find Them: The Auto-Incremented Integer Index in StaticFrame](articles/aiii.md)

API Overview

* [Overview: Series](api_overview/series.md)
* [Overview: SeriesHE](api_overview/series_he.md)
* [Overview: Frame](api_overview/frame.md)
* [Overview: FrameGO](api_overview/frame_go.md)
* [Overview: FrameHE](api_overview/frame_he.md)
* [Overview: Bus](api_overview/bus.md)
* [Overview: Batch](api_overview/batch.md)
* [Overview: Yarn](api_overview/yarn.md)
* [Overview: Quilt](api_overview/quilt.md)
* [Overview: Index](api_overview/index.md)
* [Overview: IndexGO](api_overview/index_go.md)
* [Overview: IndexHierarchy](api_overview/index_hierarchy.md)
* [Overview: IndexHierarchyGO](api_overview/index_hierarchy_go.md)
* [Overview: IndexYear](api_overview/index_year.md)
* [Overview: IndexYearGO](api_overview/index_year_go.md)
* [Overview: IndexYearMonth](api_overview/index_year_month.md)
* [Overview: IndexYearMonthGO](api_overview/index_year_month_go.md)
* [Overview: IndexDate](api_overview/index_date.md)
* [Overview: IndexDateGO](api_overview/index_date_go.md)
* [Overview: IndexMinute](api_overview/index_minute.md)
* [Overview: IndexMinuteGO](api_overview/index_minute_go.md)
* [Overview: IndexHour](api_overview/index_hour.md)
* [Overview: IndexHourGO](api_overview/index_hour_go.md)
* [Overview: IndexSecond](api_overview/index_second.md)
* [Overview: IndexSecondGO](api_overview/index_second_go.md)
* [Overview: IndexMillisecond](api_overview/index_millisecond.md)
* [Overview: IndexMillisecondGO](api_overview/index_millisecond_go.md)
* [Overview: IndexMicrosecond](api_overview/index_microsecond.md)
* [Overview: IndexMicrosecondGO](api_overview/index_microsecond_go.md)
* [Overview: IndexNanosecond](api_overview/index_nanosecond.md)
* [Overview: IndexNanosecondGO](api_overview/index_nanosecond_go.md)
* [Overview: HLoc](api_overview/hloc.md)
* [Overview: ILoc](api_overview/iloc.md)
* [Overview: TypeClinic](api_overview/type_clinic.md)
* [Overview: CallGuard](api_overview/call_guard.md)
* [Overview: ClinicResult](api_overview/clinic_result.md)
* [Overview: Require](api_overview/require.md)
* [Overview: WWW](api_overview/www.md)
* [Overview: FillValueAuto](api_overview/fill_value_auto.md)
* [Overview: DisplayActive](api_overview/display_active.md)
* [Overview: DisplayConfig](api_overview/display_config.md)
* [Overview: StoreConfig](api_overview/store_config.md)
* [Overview: StoreFilter](api_overview/store_filter.md)
* [Overview: IndexAutoFactory](api_overview/index_auto_factory.md)
* [Overview: IndexDefaultConstructorFactory](api_overview/index_default_constructor_factory.md)
* [Overview: IndexAutoConstructorFactory](api_overview/index_auto_constructor_factory.md)
* [Overview: NPZ](api_overview/npz.md)
* [Overview: NPY](api_overview/npy.md)
* [Overview: MemoryDisplay](api_overview/memory_display.md)
* [Overview: Platform](api_overview/platform.md)

API Detail

* [Detail: Series](api_detail/series.md)
* [Detail: SeriesHE](api_detail/series_he.md)
* [Detail: Frame](api_detail/frame.md)
* [Detail: FrameGO](api_detail/frame_go.md)
* [Detail: FrameHE](api_detail/frame_he.md)
* [Detail: Bus](api_detail/bus.md)
* [Detail: Batch](api_detail/batch.md)
* [Detail: Yarn](api_detail/yarn.md)
* [Detail: Quilt](api_detail/quilt.md)
* [Detail: Index](api_detail/index.md)
* [Detail: IndexGO](api_detail/index_go.md)
* [Detail: IndexHierarchy](api_detail/index_hierarchy.md)
* [Detail: IndexHierarchyGO](api_detail/index_hierarchy_go.md)
* [Detail: IndexYear](api_detail/index_year.md)
* [Detail: IndexYearGO](api_detail/index_year_go.md)
* [Detail: IndexYearMonth](api_detail/index_year_month.md)
* [Detail: IndexYearMonthGO](api_detail/index_year_month_go.md)
* [Detail: IndexDate](api_detail/index_date.md)
* [Detail: IndexDateGO](api_detail/index_date_go.md)
* [Detail: IndexMinute](api_detail/index_minute.md)
* [Detail: IndexMinuteGO](api_detail/index_minute_go.md)
* [Detail: IndexHour](api_detail/index_hour.md)
* [Detail: IndexHourGO](api_detail/index_hour_go.md)
* [Detail: IndexSecond](api_detail/index_second.md)
* [Detail: IndexSecondGO](api_detail/index_second_go.md)
* [Detail: IndexMillisecond](api_detail/index_millisecond.md)
* [Detail: IndexMillisecondGO](api_detail/index_millisecond_go.md)
* [Detail: IndexMicrosecond](api_detail/index_microsecond.md)
* [Detail: IndexMicrosecondGO](api_detail/index_microsecond_go.md)
* [Detail: IndexNanosecond](api_detail/index_nanosecond.md)
* [Detail: IndexNanosecondGO](api_detail/index_nanosecond_go.md)
* [Detail: HLoc](api_detail/hloc.md)
* [Detail: ILoc](api_detail/iloc.md)
* [Detail: TypeClinic](api_detail/type_clinic.md)
* [Detail: CallGuard](api_detail/call_guard.md)
* [Detail: ClinicResult](api_detail/clinic_result.md)
* [Detail: Require](api_detail/require.md)
* [Detail: WWW](api_detail/www.md)
* [Detail: FillValueAuto](api_detail/fill_value_auto.md)
* [Detail: DisplayActive](api_detail/display_active.md)
* [Detail: DisplayConfig](api_detail/display_config.md)
* [Detail: StoreConfig](api_detail/store_config.md)
* [Detail: StoreFilter](api_detail/store_filter.md)
* [Detail: IndexAutoFactory](api_detail/index_auto_factory.md)
* [Detail: IndexDefaultConstructorFactory](api_detail/index_default_constructor_factory.md)
* [Detail: IndexAutoConstructorFactory](api_detail/index_auto_constructor_factory.md)
* [Detail: NPZ](api_detail/npz.md)
* [Detail: NPY](api_detail/npy.md)
* [Detail: MemoryDisplay](api_detail/memory_display.md)
* [Detail: Platform](api_detail/platform.md)

[StaticFrame](index.md)

* static-frame
* [View page source](_sources/readme.rst.txt)

[Previous](index.md "StaticFrame")
[Next](license.md "License")

---

![https://raw.githubusercontent.com/static-frame/static-frame/master/doc/images/sf-logo-web_icon-small.png](https://raw.githubusercontent.com/static-frame/static-frame/master/doc/images/sf-logo-web_icon-small.png)
[![https://img.shields.io/pypi/pyversions/static-frame.svg](https://img.shields.io/pypi/pyversions/static-frame.svg)](https://pypi.org/project/static-frame)
[![https://img.shields.io/pypi/v/static-frame.svg](https://img.shields.io/pypi/v/static-frame.svg)](https://pypi.org/project/static-frame)
[![https://img.shields.io/conda/vn/conda-forge/static-frame.svg](https://img.shields.io/conda/vn/conda-forge/static-frame.svg)](https://anaconda.org/conda-forge/static-frame)
[![https://img.shields.io/codecov/c/github/static-frame/static-frame.svg](https://img.shields.io/codecov/c/github/static-frame/static-frame.svg)](https://codecov.io/gh/static-frame/static-frame)
[![https://img.shields.io/github/actions/workflow/status/static-frame/static-frame/ci.yml?branch=master&label=test&logo=Github](https://img.shields.io/github/actions/workflow/status/static-frame/static-frame/ci.yml?branch=master&label=test&logo=Github)](https://github.com/static-frame/static-frame/actions/workflows/ci.yml)
[![https://img.shields.io/readthedocs/static-frame.svg](https://img.shields.io/readthedocs/static-frame.svg)](https://static-frame.readthedocs.io/en/latest)
[![https://img.shields.io/badge/hypothesis-tested-brightgreen.svg](https://img.shields.io/badge/hypothesis-tested-brightgreen.svg)](https://hypothesis.readthedocs.io)
[![https://img.shields.io/pypi/status/static-frame.svg](https://img.shields.io/pypi/status/static-frame.svg)](https://pypi.org/project/static-frame)
[![https://img.shields.io/badge/launch-binder-579ACA.svg?logo=data:image/png;base64,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](https://img.shields.io/badge/launch-binder-579ACA.svg?logo=data:image/png;base64,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)](https://mybinder.org/v2/gh/static-frame/static-frame-ftgu/default?urlpath=tree/index.ipynb)

# static-frame[](#static-frame "Link to this heading")

Immutable and statically-typeable DataFrames with runtime type and data validation.

Among the many Python DataFrame libraries, StaticFrame is an alternative that prioritizes correctness, maintainability, and reducing opportunities for error. Key features include:

* 🛡️ Immutable Data: Provides memory efficiency, excellent performance, and prohibits side effects.
* 🗜️ Static Typing: Use Python type-hints to statically type index, columns, and columnar types.
* 🚦 Runtime Validation: Use type hints and specialized validators for runtime type and data checks.
* 🧭 Consistent Interface: An easy-to-learn, hierarchical, and intuitive API that avoids the many inconsistencies of Pandas.
* 🧬 Comprehensive `dtype` Support: Full compatibility with all NumPy dtypes and datetime64 units.
* 🔗 Broad Interoperability: Translate between Pandas, Arrow, Parquet, CSV, TSV, JSON, Excel XLSX, SQLite, and NumPy; output to xarray, VisiData, HTML, RST, Markdown, LaTeX, and Jupyter notebooks.
* 🚀 Optimized Serialization & Memory Mapping: Fast disk I/O with custom NPZ and NPY encodings.
* 💼 Multi-Table Containers: The `Bus` and `Yarn` provide interfaces to collections of tables with lazy data loading, well-suited for large datasets.
* ⏳ Deferred Processing: The `Batch` provides a common interface for deferred processing of groups, windows, or any iterator.
* 🪶 Lean Dependencies: Core functionality relies only on NumPy and a team-maintained C-extension.
* 📚 Comprehensive Documentation: All API endpoints documented with thousands of easily runnable examples.

Code: <https://github.com/static-frame/static-frame>

Docs: <http://static-frame.readthedocs.io>

Packages: <https://pypi.org/project/static-frame>

API Search: <https://staticframe.dev>

Jupyter Notebook Tutorial: [Launch Binder](https://mybinder.org/v2/gh/static-frame/static-frame-ftgu/default?urlpath=tree/index.ipynb)

## Installation via `pip`[](#installation-via-pip "Link to this heading")

Install StaticFrame with `pip`. Note that pre-built wheels are published for all supported Python versions and platforms (including Apple Silicon platforms):

```
pip install static-frame

```

To install optional dependencies for full support of input and output formats (such as XLSX and HDF5) via `pip`:

```
pip install static-frame [extras]

```

## Installation via `conda`[](#installation-via-conda "Link to this heading")

StaticFrame can be installed via `conda` with the `conda-forge` channel. Note that pre-built wheels of StaticFrame and all compiled dependencies are available through `pip` and may offer more compatibility than a `conda`-based installation

```
conda install -c conda-forge static-frame

```

## Installation via Pyodide[](#installation-via-pyodide "Link to this heading")

StaticFrame can be run in the browser via Pyodide with the `static_frame_pyodide` package: <https://github.com/static-frame/static-frame-pyodide>

## Dependencies[](#dependencies "Link to this heading")

Core StaticFrame requires the following:

* Python>=3.10
* numpy>=1.24.3 (numpy>=2 is supported)
* arraykit==1.0.8
* typing-extensions>=4.12.0

For extended input and output, the following packages are required:

* pandas>=1.1.5
* xlsxwriter>=1.1.2
* openpyxl>=3.0.9
* xarray>=0.13.0
* pyarrow>=3.0.0
* visidata>=2.4

## Quick-Start Guide[](#quick-start-guide "Link to this heading")

To get startred quickly, let’s download the classic iris (flower) characteristics data set and build a simple naive Bayes classifier that can predict species from iris petal characteristics.

While StaticFrame’s API has over 7,500 endpoints, much will be familiar to users of Pandas or other DataFrame libraries. Rather than offering fewer interfaces with greater configurability, StaticFrame favors more numerous interfaces with more narrow parameters and functionality. This design leads to more maintainable code. (Read more about differences between Pandas and StaticFrame [here](https://static-frame.readthedocs.io/en/latest/articles/upgrade.md).)

We can download the data set from the UCI Machine Learning Repository and create a `Frame`. StaticFrame exposes all constructors on the class: here, we will use the `Frame.from_csv()` constructor. To download a file from the internet and provide it to a constructor, we can use StaticFrame’s `WWW.from_file()` interface:

```
>>> import static_frame as sf
>>> data = sf.Frame.from_csv(sf.WWW.from_file('https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data'), columns_depth=0)

```

Each record (or row) in this dataset describes observations of an iris flower, including its sepal and petal characteristics, as well as its species (of which there are three). To display just the first few rows, we can use the `head()` method. Notice that StaticFrame’s default display makes it very clear what type of `Frame`, `Index`, and NumPy datatypes are present:

```
>>> data.head()
<Frame>
<Index> 0         1         2         3         4           <int64>
<Index>
0       5.1       3.5       1.4       0.2       Iris-setosa
1       4.9       3.0       1.4       0.2       Iris-setosa
2       4.7       3.2       1.3       0.2       Iris-setosa
3       4.6       3.1       1.5       0.2       Iris-setosa
4       5.0       3.6       1.4       0.2       Iris-setosa
<int64> <float64> <float64> <float64> <float64> <<U15>

```

As the columns are unlabelled, let’s next add column labels. StaticFrame supports reindexing (conforming existing axis labels to new labels, potentially changing the size and ordering) and relabeling (simply applying new labels without regard to existing labels). As we can ignore the default column labels (auto-incremented integers), the `relabel()` method is used to provide new labels.

Note that while `relabel()` creates a new `Frame`, underlying NumPy data is not copied. As all NumPy data is immutable in StaticFrame, we can reuse it in our new container, making such operations very efficient:

```
>>> data = data.relabel(columns=('sepal_l', 'sepal_w', 'petal_l', 'petal_w', 'species'))
>>> data.head()
<Frame>
<Index> sepal_l   sepal_w   petal_l   petal_w   species     <<U7>
<Index>
0       5.1       3.5       1.4       0.2       Iris-setosa
1       4.9       3.0       1.4       0.2       Iris-setosa
2       4.7       3.2       1.3       0.2       Iris-setosa
3       4.6       3.1       1.5       0.2       Iris-setosa
4       5.0       3.6       1.4       0.2       Iris-setosa
<int64> <float64> <float64> <float64> <float64> <<U15>

```

(Read more about no-copy operations [here](https://static-frame.readthedocs.io/en/latest/articles/no_copy.md).)

For this example, eighty percent of the data will be used to train the classifier; the remaining twenty percent will be used to test the classifier. As all records are labelled with the known species, we can conclude by measuring the effectiveness of the classifier on the test data.

To divide the data into two groups, we create a `Series` of contiguous integers and then extract a random selection of 80% of the values into a new `Series`, here named `sel_train`. This will be used to select our traning data. As the `sample()` method, given a count, randomly samples that many values, your results will be different unless use the same `seed` argument:

```
>>> sel = sf.Series(np.arange(len(data)))
>>> sel_train = sel.sample(round(len(data) * .8), seed=42)
>>> sel_train.head()
<Series>
<Index>
0        0
2        2
3        3
4        4
5        5
<int64>  <int64>

```

We will create another `Series` to select the test data. The `drop[]` interface can be used to create a new `Series` that excludes the training selections, leaving just the testing selections. As with many interfaces in StaticFrame (such as `astype` and `assign`), brackets can be used to do `loc[]` style selections:

```
>>> sel_test = sel.drop[sel_train]
>>> sel_test.head()
<Series>
<Index>
1        1
14       14
20       20
21       21
37       37
<int64>  <int64>

```

To select a subset of the data for training, the `sel_train` `Series` can be passed to `loc[]` to select just those rows:

```
>>> data_train = data.loc[sel_train]
>>> data_train.head()
<Frame>
<Index> sepal_l   sepal_w   petal_l   petal_w   species     <<U7>
<Index>
0       5.1       3.5       1.4       0.2       Iris-setosa
2       4.7       3.2       1.3       0.2       Iris-setosa
3       4.6       3.1       1.5       0.2       Iris-setosa
4       5.0       3.6       1.4       0.2       Iris-setosa
5       5.4       3.9       1.7       0.4       Iris-setosa
<int64> <float64> <float64> <float64> <float64> <<U15>

```

With our data divided into two randomly-selected, non-overlapping groups, we can proceed to implement the naive Bayes classifier. We will compute the `posterior` of the test data by multiplying the `prior` and the `likelihood`. With the `posterior`, we can determine which species the classifier has calculated is most likely. (More on naive Bayes classifiers can be found [here](https://en.wikipedia.org/wiki/Naive_Bayes_classifier).)

The `prior` is calculated as the percentage of samples of each species in the training data. This is the “normalized” count per species. To get a `Series` of counts per species, we can select the species column, iterate over groups based on species name, and count the size of each group.

In StaticFrame, this can be done by calling `Series.iter_group_items()` to get an iterator of pairs of group label, group (where the group is a `Series`). This iterator (or any similar iterator) can be given to a `Batch`, a chaining processor of `Frame` or `Series`, to perform operations on each group. (For more on the `Batch` and other higher-order containers in StaticFrame, see [here](https://static-frame.readthedocs.io/en/latest/articles/uhoc.md).)

Once the `Batch` is created, selections, method calls, and operator expressions can be chained as if they were being called on a single container. Processing happens to every contained container, and a container is returned, only when a finalizer method, such as `to_series()`, is called:

```
>>> counts = sf.Batch(data_train['species'].iter_group_items()).count().to_series()
>>> counts
<Series>
<Index>
Iris-setosa     43
Iris-versicolor 39
Iris-virginica  38
<<U15>          <int64>

```

As with NumPy, StaticFrame containers can be used in expressions with binary operators. The `prior` can be derived by dividing `counts` by the size of the training data. This returns a `Series` of the percentage of records per species:

```
>>> prior = counts / len(data_train)
>>> prior
<Series>
<Index>
Iris-setosa     0.35833333333333334
Iris-versicolor 0.325
Iris-virginica  0.31666666666666665
<<U15>          <float64>

```

Having calculated the `prior`, we can calculate `likelihood` next. To calculate `likelihood`, we will call a probability distribution function (imported from SciPy) with the test data, once for each species, given the characteristics (mean and standard deviation) observed in the test data for that species.

The `Batch` can again be used to calculate the mean and standard deviation, per species, from the training data. With the `Frame` of training data, we call `iter_group_items()` to group by species and, passing that iterator to `Batch`, call `mean()` (assigned to `mu`) or `std()` (assigned to `sigma`). Note that `iter_group_items()` has an optional `drop` parameter to remove the column used for grouping from subsequent operations:

```
>>> mu = sf.Batch(data_train[['sepal_l', 'sepal_w', 'species']].iter_group_items('species', drop=True)).mean().to_frame()
>>> mu
<Frame>
<Index>         sepal_l            sepal_w            <<U7>
<Index>
Iris-setosa     4.986046511627907  3.434883720930233
Iris-versicolor 5.920512820512819  2.771794871794872
Iris-virginica  6.6078947368421055 2.9763157894736842
<<U15>          <float64>          <float64>

>>> sigma = sf.Batch(data_train[['sepal_l', 'sepal_w', 'species']].iter_group_items('species', drop=True)).std(ddof=1).to_frame()
>>> sigma
<Frame>
<Index>         sepal_l            sepal_w             <<U7>
<Index>
Iris-setosa     0.3419700595003668 0.3477024733400345
Iris-versicolor 0.508444214804487  0.33082728674826684
Iris-virginica  0.6055516042229233 0.3513942965328924
<<U15>          <float64>          <float64>

```

For a unified display of these characteristics, we can build a hierarchical index on each `Frame` with `relabel_level_add()` (adding the “mu” or “sigma” labels), then vertically concatenate the tables. As StaticFrame always requires unique labels in indices, adding an additional label is required before concatenation. The built-in `round` function can be used for more tidy display:

```
>>> stats = sf.Frame.from_concat((mu.relabel_level_add('mu'), sigma.relabel_level_add('sigma')))
>>> round(stats, 2)
<Frame>
<Index>                          sepal_l   sepal_w   <<U7>
<IndexHierarchy>
mu               Iris-setosa     4.99      3.43
mu               Iris-versicolor 5.92      2.77
mu               Iris-virginica  6.61      2.98
sigma            Iris-setosa     0.34      0.35
sigma            Iris-versicolor 0.51      0.33
sigma            Iris-virginica  0.61      0.35
<<U5>            <<U15>          <float64> <float64>

```

We can now move on to processing the test data with the characteristics derived from the training data. To do that, we will extract our previously selected test records with `sel_test` into a new `Frame`, to which we can add our `posterior` predictions and final species classifications.

It is common to process data in table by adding columns from left to right. StaticFrame permits this limited form of mutability with the grow-only `FrameGO`. While underlying NumPy arrays are still always immutable, columns can be added to a `FrameGO` with bracket-style assignments. A `FrameGO` can be created from a `Frame` with the `to_frame_go()` method. As mentioned elsewhere, underlying immutable NumPy arrays are not copied: this is an efficient, no-copy operation.

Passing two arguments to `loc[]`, we can select rows with the values from `sel_test`, and we can select columns with a list of labels for the sepal length and sepal width:

```
>>> data_test = data.loc[sel_test.values, ['sepal_l', 'sepal_w']].to_frame_go()
>>> data_test.head()
<FrameGO>
<IndexGO> sepal_l   sepal_w   <<U7>
<Index>
1         4.9       3.0
14        5.8       4.0
20        5.4       3.4
21        5.1       3.7
37        4.9       3.1
<int64>   <float64> <float64>

```

StaticFrame interfaces make extensive use of iterators and generators. As used below, the `Frame.from_fields()` constructor will create a `Frame` from any iterable (or generator) of column arrays.

The `likelihood_of_species()` function (defined below), for each index label in `mu` (which provides each unique iris species), calculates a probability density function for the test data, given the `mu` (mean) and `sigma` (standard deviation) for the species. An array of the sum of the log is yielded:

```
>>> from scipy.stats import norm
>>> def likelihood_of_species():
...     for label in mu.index:
...             pdf = norm.pdf(data_test.values, mu.loc[label], sigma.loc[label])
...             yield np.log(pdf).sum(axis=1)

```

While the generator function above is easy to read, it is hard to copy and paste. If you are following along, using the one-line generator expression, below, will be easier. The two are equivalent:

```
>>> likelihood_of_species = (np.log(norm.pdf(data_test.values, mu.loc[label], sigma.loc[label])).sum(axis=1) for label in mu.index)

```

With this generator expression defined, we call the `from_fields` constructor to produce the `likelihood` table, providing column labels from `mu.index` and index labels from `data_test.index`. For each test record row we now have a likelihood per species:

```
>>> likelihood = sf.Frame.from_fields(likelihood_of_species, columns=mu.index, index=data_test.index)
>>> round(likelihood.head(), 2)
<Frame>
<Index> Iris-setosa Iris-versicolor Iris-virginica <<U15>
<Index>
1       -0.52       -2.31           -4.27
14      -3.86       -6.97           -5.42
20      -0.45       -2.38           -3.01
21      -0.05       -5.29           -5.51
37      -0.2        -2.56           -4.33
<int64> <float64>   <float64>       <float64>

```

We can calculate the `posterior` by multiplying `likelihood` by `prior`. Whenever performing binary operations on `Frame` and `Series`, indices will be aligned and, if necessary, reindexed before processing:

```
>>> posterior = likelihood * prior
>>> round(posterior.head(), 2)
<Frame>
<Index> Iris-setosa Iris-versicolor Iris-virginica <<U15>
<Index>
1       -0.19       -0.75           -1.35
14      -1.38       -2.27           -1.72
20      -0.16       -0.77           -0.95
21      -0.02       -1.72           -1.75
37      -0.07       -0.83           -1.37
<int64> <float64>   <float64>       <float64>

```

We can now add columns to our `data_test` `FrameGO`. To determine our best prediction of species for each row of the test data, the column label (the species) of the maximum a posteriori estimate is selected with `loc_max()`:

```
>>> data_test['predict'] = posterior.loc_max(axis=1)
>>> data_test.head()
<FrameGO>
<IndexGO> sepal_l   sepal_w   predict     <<U7>
<Index>
1         4.9       3.0       Iris-setosa
14        5.8       4.0       Iris-setosa
20        5.4       3.4       Iris-setosa
21        5.1       3.7       Iris-setosa
37        4.9       3.1       Iris-setosa
<int64>   <float64> <float64> <<U15>

```

We can add two additional columns to evaluate the effectivess of the classifier. First, we can add an “observed” column by adding the original “species” column from the original `data` `Frame`. In assigning a `Series` to a `Frame`, only values found in the intersection of the indices will be added as a column:

```
>>> data_test['observed'] = data['species']
>>> data_test.head()
<FrameGO>
<IndexGO> sepal_l   sepal_w   predict     observed    <<U8>
<Index>
1         4.9       3.0       Iris-setosa Iris-setosa
14        5.8       4.0       Iris-setosa Iris-setosa
20        5.4       3.4       Iris-setosa Iris-setosa
21        5.1       3.7       Iris-setosa Iris-setosa
37        4.9       3.1       Iris-setosa Iris-setosa
<int64>   <float64> <float64> <<U15>      <<U15>

```

Having populated a column of predicted and observed values, we can compare the two to get a Boolean column indicating when the classifier calculated a correct predicton:

```
>>> data_test['correct'] = data_test['predict'] == data_test['observed']
>>> data_test.tail()
<FrameGO>
<IndexGO> sepal_l   sepal_w   predict         observed       correct <<U8>
<Index>
129       7.2       3.0       Iris-virginica  Iris-virginica True
130       7.4       2.8       Iris-virginica  Iris-virginica True
140       6.7       3.1       Iris-virginica  Iris-virginica True
144       6.7       3.3       Iris-virginica  Iris-virginica True
149       5.9       3.0       Iris-versicolor Iris-virginica False
<int64>   <float64> <float64> <<U15>          <<U15>         <bool>

```

To find the percentage of correct classifications among the test data, we can sum the `correct` Boolean column and divide that by the size of the test data:

```
>>> data_test["correct"].sum() / len(data_test)
0.7333333333333333

```

This simple naive Bayes classifier can predict iris species correctly about 73% of the time.

For further introduction to StaticFrame, including links to articles, videos, and documentation, see [here](https://static-frame.readthedocs.io/en/latest/intro.md).

[Previous](index.md "StaticFrame")
[Next](license.md "License")

---

© Copyright 2025, Christopher Ariza.
Last updated on May 17, 2025.

Built with [Sphinx](https://www.sphinx-doc.org/) using a
[theme](https://github.com/readthedocs/sphinx_rtd_theme)
provided by [Read the Docs](https://readthedocs.org).