[![Logo](../_static/sf-logo-web_icon-small.png)](../index.md)

Quick Start

* [static-frame](../readme.md)
* [License](../license.md)

Introduction

* [About StaticFrame](../intro.md)
* [Media](../intro.md#media)
* [What is New in StaticFrame](../new.md)
* [Contributing](../contributing.md)

Articles

* [Improving Code Quality with Array and DataFrame Type Hints](guard.md)
* [Type-Hinting DataFrames for Static Analysis and Runtime Validation](ftyping.md)
* [Faster DataFrame Serialization](serialize.md)
* [The Performance Advantage of No-Copy DataFrame Operations](no_copy.md)
* [Memoizing DataFrame Functions: Using Hashable DataFrames and Message Digests to Optimize Repeated Calculations](hash.md)
* Using Higher-Order Containers to Efficiently Process 7,163 (or More) DataFrames
  + [Container Overview](#container-overview)
    - [Bus](#bus)
    - [Batch](#batch)
    - [Quilt](#quilt)
    - [Yarn](#yarn)
    - [Common & Distinguishing Characteristics](#common-distinguishing-characteristics)
  + [Processing 7,163 DataFrames](#processing-7-163-dataframes)
  + [Cross-Container Comparisons: Same Method, Different Selections](#cross-container-comparisons-same-method-different-selections)
  + [Cross-Container Comparisons: Same Selections, Different Methods](#cross-container-comparisons-same-selections-different-methods)
  + [Minimizing Memory Usage](#minimizing-memory-usage)
  + [Parallel Processing](#parallel-processing)
  + [Conclusion](#conclusion)
* [One Fill Value Is Not Enough: Preserving Columnar Types When Reindexing DataFrames](fill_value.md)
* [Ten Reasons to Use StaticFrame Instead of Pandas](upgrade.md)
* [Boring Indices & Where to Find Them: The Auto-Incremented Integer Index in StaticFrame](aiii.md)

API Overview

* [Overview: Series](../api_overview/series.md)
* [Overview: SeriesHE](../api_overview/series_he.md)
* [Overview: Frame](../api_overview/frame.md)
* [Overview: FrameGO](../api_overview/frame_go.md)
* [Overview: FrameHE](../api_overview/frame_he.md)
* [Overview: Bus](../api_overview/bus.md)
* [Overview: Batch](../api_overview/batch.md)
* [Overview: Yarn](../api_overview/yarn.md)
* [Overview: Quilt](../api_overview/quilt.md)
* [Overview: Index](../api_overview/index.md)
* [Overview: IndexGO](../api_overview/index_go.md)
* [Overview: IndexHierarchy](../api_overview/index_hierarchy.md)
* [Overview: IndexHierarchyGO](../api_overview/index_hierarchy_go.md)
* [Overview: IndexYear](../api_overview/index_year.md)
* [Overview: IndexYearGO](../api_overview/index_year_go.md)
* [Overview: IndexYearMonth](../api_overview/index_year_month.md)
* [Overview: IndexYearMonthGO](../api_overview/index_year_month_go.md)
* [Overview: IndexDate](../api_overview/index_date.md)
* [Overview: IndexDateGO](../api_overview/index_date_go.md)
* [Overview: IndexMinute](../api_overview/index_minute.md)
* [Overview: IndexMinuteGO](../api_overview/index_minute_go.md)
* [Overview: IndexHour](../api_overview/index_hour.md)
* [Overview: IndexHourGO](../api_overview/index_hour_go.md)
* [Overview: IndexSecond](../api_overview/index_second.md)
* [Overview: IndexSecondGO](../api_overview/index_second_go.md)
* [Overview: IndexMillisecond](../api_overview/index_millisecond.md)
* [Overview: IndexMillisecondGO](../api_overview/index_millisecond_go.md)
* [Overview: IndexMicrosecond](../api_overview/index_microsecond.md)
* [Overview: IndexMicrosecondGO](../api_overview/index_microsecond_go.md)
* [Overview: IndexNanosecond](../api_overview/index_nanosecond.md)
* [Overview: IndexNanosecondGO](../api_overview/index_nanosecond_go.md)
* [Overview: HLoc](../api_overview/hloc.md)
* [Overview: ILoc](../api_overview/iloc.md)
* [Overview: TypeClinic](../api_overview/type_clinic.md)
* [Overview: CallGuard](../api_overview/call_guard.md)
* [Overview: ClinicResult](../api_overview/clinic_result.md)
* [Overview: Require](../api_overview/require.md)
* [Overview: WWW](../api_overview/www.md)
* [Overview: FillValueAuto](../api_overview/fill_value_auto.md)
* [Overview: DisplayActive](../api_overview/display_active.md)
* [Overview: DisplayConfig](../api_overview/display_config.md)
* [Overview: StoreConfig](../api_overview/store_config.md)
* [Overview: StoreFilter](../api_overview/store_filter.md)
* [Overview: IndexAutoFactory](../api_overview/index_auto_factory.md)
* [Overview: IndexDefaultConstructorFactory](../api_overview/index_default_constructor_factory.md)
* [Overview: IndexAutoConstructorFactory](../api_overview/index_auto_constructor_factory.md)
* [Overview: NPZ](../api_overview/npz.md)
* [Overview: NPY](../api_overview/npy.md)
* [Overview: MemoryDisplay](../api_overview/memory_display.md)
* [Overview: Platform](../api_overview/platform.md)

API Detail

* [Detail: Series](../api_detail/series.md)
* [Detail: SeriesHE](../api_detail/series_he.md)
* [Detail: Frame](../api_detail/frame.md)
* [Detail: FrameGO](../api_detail/frame_go.md)
* [Detail: FrameHE](../api_detail/frame_he.md)
* [Detail: Bus](../api_detail/bus.md)
* [Detail: Batch](../api_detail/batch.md)
* [Detail: Yarn](../api_detail/yarn.md)
* [Detail: Quilt](../api_detail/quilt.md)
* [Detail: Index](../api_detail/index.md)
* [Detail: IndexGO](../api_detail/index_go.md)
* [Detail: IndexHierarchy](../api_detail/index_hierarchy.md)
* [Detail: IndexHierarchyGO](../api_detail/index_hierarchy_go.md)
* [Detail: IndexYear](../api_detail/index_year.md)
* [Detail: IndexYearGO](../api_detail/index_year_go.md)
* [Detail: IndexYearMonth](../api_detail/index_year_month.md)
* [Detail: IndexYearMonthGO](../api_detail/index_year_month_go.md)
* [Detail: IndexDate](../api_detail/index_date.md)
* [Detail: IndexDateGO](../api_detail/index_date_go.md)
* [Detail: IndexMinute](../api_detail/index_minute.md)
* [Detail: IndexMinuteGO](../api_detail/index_minute_go.md)
* [Detail: IndexHour](../api_detail/index_hour.md)
* [Detail: IndexHourGO](../api_detail/index_hour_go.md)
* [Detail: IndexSecond](../api_detail/index_second.md)
* [Detail: IndexSecondGO](../api_detail/index_second_go.md)
* [Detail: IndexMillisecond](../api_detail/index_millisecond.md)
* [Detail: IndexMillisecondGO](../api_detail/index_millisecond_go.md)
* [Detail: IndexMicrosecond](../api_detail/index_microsecond.md)
* [Detail: IndexMicrosecondGO](../api_detail/index_microsecond_go.md)
* [Detail: IndexNanosecond](../api_detail/index_nanosecond.md)
* [Detail: IndexNanosecondGO](../api_detail/index_nanosecond_go.md)
* [Detail: HLoc](../api_detail/hloc.md)
* [Detail: ILoc](../api_detail/iloc.md)
* [Detail: TypeClinic](../api_detail/type_clinic.md)
* [Detail: CallGuard](../api_detail/call_guard.md)
* [Detail: ClinicResult](../api_detail/clinic_result.md)
* [Detail: Require](../api_detail/require.md)
* [Detail: WWW](../api_detail/www.md)
* [Detail: FillValueAuto](../api_detail/fill_value_auto.md)
* [Detail: DisplayActive](../api_detail/display_active.md)
* [Detail: DisplayConfig](../api_detail/display_config.md)
* [Detail: StoreConfig](../api_detail/store_config.md)
* [Detail: StoreFilter](../api_detail/store_filter.md)
* [Detail: IndexAutoFactory](../api_detail/index_auto_factory.md)
* [Detail: IndexDefaultConstructorFactory](../api_detail/index_default_constructor_factory.md)
* [Detail: IndexAutoConstructorFactory](../api_detail/index_auto_constructor_factory.md)
* [Detail: NPZ](../api_detail/npz.md)
* [Detail: NPY](../api_detail/npy.md)
* [Detail: MemoryDisplay](../api_detail/memory_display.md)
* [Detail: Platform](../api_detail/platform.md)

[StaticFrame](../index.md)

* Using Higher-Order Containers to Efficiently Process 7,163 (or More) DataFrames
* [View page source](../_sources/articles/uhoc.rst.txt)

[Previous](hash.md "Memoizing DataFrame Functions: Using Hashable DataFrames and Message Digests to Optimize Repeated Calculations")
[Next](fill_value.md "One Fill Value Is Not Enough: Preserving Columnar Types When Reindexing DataFrames")

---

# Using Higher-Order Containers to Efficiently Process 7,163 (or More) DataFrames[](#using-higher-order-containers-to-efficiently-process-7-163-or-more-dataframes "Link to this heading")

DataFrame processing routines commonly work with collections of tables. Examples of such collections include a multi-year dataset with a single table per year, historical stock data with a table per ticker, or data from multiple sheets in an XLSX file. This article introduces novel “higher-order” containers for working with such collections of DataFrames, implemented in the Python StaticFrame package (a Pandas alternative that offers immutable DataFrames). The three core containers are the `Bus`, `Batch`, and `Quilt`. A fourth container, the `Yarn`, will be briefly introduced.

An alternative to these higher-order containers is using one large table with a hierarchical index. For example, time-series data for multiple stocks might be encoded in a single table with a two-depth hierarchical index, the outer level being the ticker, the inner level being the date. Such an approach is often inefficient, as the entire table must be loaded in memory even if only a small number of stocks are being processed.

This article introduces containers for working with large collections of tables, from thousands to hundreds of thousands of tables. Efficient memory usage is provided through lazy loading and, optionally, eager unloading. The `Bus` (named after buses used in circuits), provides a dictionary-like interface for lazily loading collections of tables stored on disk; collections can be stored in SQLite, HDF5, XLSX, or in zipped archives of Parquet, NPZ, pickle, or delimited text files. The `Batch` (named after batch processing), is a deferred processor of tables, providing a concise interface to lazily define operations to be applied to all tables. The `Quilt` (named after textiles formed from a patchwork), is a lazy, virtual concatenation of all tables, permitting operations on partitioned data as if it was a unified, single table.

All three containers provide identical interfaces for reading from, and writing to, the multi-table storage formats mentioned above (SQLite, HDF5, XLSX, or zipped archives of Parquet, NPZ, pickle, or delimited text files). This uniformity permits reusing the same data store in different contexts.

These tools evolved from the context of my work: processing financial data and modelling investment systems. There, datasets are naturally partitioned by date or characteristic. For historical simulations, the data needed can be large. The `Bus`, `Batch`, `Quilt`, and `Yarn` have provided convenient and efficient tools in this domain. Out-of-core solutions like Vaex and Dask offer related approaches to dealing with large collections of data, though with different tradeoffs.

While these containers are implemented in StaticFrame, the abstractions are useful for application in any DataFrame or table-processing library. StaticFrame calls a DataFrame simply a “Frame,” and that convention will be used herein. StaticFrame is imported with the following convention:

```
>>> import static_frame as sf

```

## Container Overview[](#container-overview "Link to this heading")

Before demonstrating the utility of using these containers to process thousands of DataFrames, we will start with processing just two DataFrames. After creating a `Bus` with two `Frames`, we will use that same `Bus` to initialize a `Batch`, `Quilt`, and `Yarn`. With this introduction, common and distinguishing characteristics can be observed.

### Bus[](#bus "Link to this heading")

Two simple `Frames` can be used to demonstrate initializing a `Bus`. The `Bus.from_items()` method takes pairs of label and `Frame`; items can be provided in a tuple (as shown below) or via an `items()` method on a Python dictionary or related container.

```
>>> f1 = sf.Frame.from_element(0.5, index=('w', 'x'), columns=('a', 'b'))
>>> f2 = sf.Frame.from_element(2, index=('y', 'z'), columns=('a', 'b'))
>>> bus = sf.Bus.from_items((('f1', f1), ('f2', f2)))
>>> bus
<Bus>
<Index>
f1      Frame
f2      Frame
<<U2>   <object>

```

The `Bus` can be thought of as a `Series` (or an ordered dictionary) of `Frames`, permitting access to a `Frame` given its label.

```
>>> bus.loc['f2']
<Frame: f2>
<Index>     a       b       <<U1>
<Index>
y           2       2
z           2       2
<<U1>       <int64> <int64>

```

A key feature of the `Bus` is that, when reading from disk, `Frames` are loaded lazily: a `Frame` is loaded into memory only when accessed, and (with the `max_persist` argument) the `Bus` can be configured to only hold strong references to a limited number of `Frames`, eagerly unloading the least-recently used beyond that limit. This permits examining all `Frames` while limiting the total memory loaded by the `Bus`.

As the `Bus` supports reading from, and writing to, XLSX and HDF5 (as well as many other formats), it provides the functionality of the Pandas `ExcelWriter` and `HDFStore` interfaces, but with a more general and consistent interface. The same `Bus` can be used to write an XLSX workbook (where each Frame is a sheet) or an HDF5 datastore, simply by using `Bus.to_xlsx()` or `Bus.to_hdf5()`, respectively.

Additionally, a `Bus` serves as a convenient resource for creating a `Batch`, `Quilt`, or `Yarn`.

### Batch[](#batch "Link to this heading")

The `Batch` can be thought of as an iterator of pairs of label and `Frame`. Beyond just an iterator, the `Batch` is a tool for composing deferred operations on each contained `Frame`. The `Batch` exposes nearly the entire `Frame` interface; method calls and operator applications, when invoked, are deferred in a newly returned `Batch`, composing lazy executions upon the stored iterator. Operations are executed, and pairs are iterated, only when creating a composite `Frame` with the `Batch.to_frame()` method, or using dictionary-like iterators such as `Batch.keys()`, `Batch.items()`, or `Batch.values`.

A `Batch` can be initialized with items from a `Bus`, or any iterator of pairs of label, `Frame`. Methods called from, or operators invoked on, a `Batch` simply return a new `Batch`. Calling `Batch.to_frame()`, as shown below, is necessary to eagerly execute the composed `sum()` operation.

```
>>> sf.Batch(bus.items()).sum()
<Batch at 0x7fabd09779a0>
>>> sf.Batch(bus.items()).sum().to_frame()
<Frame>
<Index> a         b         <<U1>
<Index>
f1      1.0       1.0
f2      4.0       4.0
<<U2>   <float64> <float64>

```

In addition to `Frame` methods, the `Batch` supports usage of `Frame` selection interfaces and operators. Below, each `Frame` is taken to the second power, the “b” column is selected, and a new `Frame` (combining both selections) is returned:

```
>>> (sf.Batch(bus.items()) ** 2)['b'].to_frame()
<Frame>
<Index> w         x         y         z         <<U1>
<Index>
f1      0.25      0.25      nan       nan
f2      nan       nan       4.0       4.0
<<U2>   <float64> <float64> <float64> <float64>

```

The `Batch` is related to the Pandas `DataFrameGroupBy` and `Rolling` objects, interfaces that, after configuring a group-by or rolling window iterable, expose function application on those groups or windows. The `Batch` generalizes this functionality, supporting those contexts as well as offering general-purpose processing of any iterator of labels and Frames.

### Quilt[](#quilt "Link to this heading")

A `Quilt` is initialized with a `Bus` (or `Yarn`), and requires specification of which axis to virtually concatenate on, either vertically (axis 0) or horizontally (axis 1). Additionally, a `Quilt` must define a Boolean for `retain_labels`: if True, `Frame` labels are retained as the outer labels in a hierarchical index along the axis of concatenation. If `retain_labels` is False, all labels along the axis of concatenation of all contained `Frames` must be unique. The following examples use the previously created `Bus` to demonstrate the `retain_labels` parameter. As a `Quilt` might be built from thousands of tables, the default representation abbreviates data; `Quilt.to_frame()` can be used to provide a fully realized representation.

```
>>> quilt = sf.Quilt(bus, axis=0, retain_labels=False)
>>> quilt
<Quilt>
<Index: Aligned>      a b <<U1>
<Index: Concatenated>
w                     . .
x                     . .
y                     . .
z                     . .
<<U1>
>>> quilt.to_frame()
<Frame>
<Index> a         b         <<U1>
<Index>
w       0.5       0.5
x       0.5       0.5
y       2.0       2.0
z       2.0       2.0
<<U1>   <float64> <float64>

```

```
>>> quilt = sf.Quilt(bus, axis=0, retain_labels=True)
>>> quilt.to_frame()
<Frame>
<Index>                a         b         <<U1>
<IndexHierarchy>
f1               w     0.5       0.5
f1               x     0.5       0.5
f2               y     2.0       2.0
f2               z     2.0       2.0
<<U2>            <<U1> <float64> <float64>

```

The `Quilt` can be thought of as a `Frame` built from many smaller `Frames`, aligned either vertically or horizontally. Importantly, this larger `Frame` is not eagerly concatenated; rather, `Frames` are accessed from a contained `Bus` as needed, providing a lazy concatenation of tables along an axis.

A `Bus` within a `Quilt` can be configured with the `max_persist` argument to limit the total number of `Frames` held in memory. Such explicit memory management permits doing operations on a virtual `Frame` that might be too large to load into memory.

The `Quilt` permits selections, iterations, and operations on this virtually concatenated `Frame` using a subset of common `Frame` interfaces. For example, a `Quilt` can be used for iterating rows and applying functions:

```
>>> quilt.iter_array(axis=1).apply(lambda a: a.sum())
<Series>
<Index>
w        1.0
x        1.0
y        4.0
z        4.0
<<U1>    <float64>

```

### Yarn[](#yarn "Link to this heading")

The `Yarn`, only briefly described here, provides a “virtual concatenation” of one or more `Bus`. As with the `Quilt`, the larger container is not eagerly concatenated. Unlike the two-dimensional, single-`Frame` presentation of the `Quilt`, the `Yarn` presents a one-dimensional container of many `Frames` with a `Bus`-like interface. Unlike a `Bus` or `Quilt`, the index of a `Yarn` can be arbitrarily relabeled. These features permit heterogeneous `Bus` to be made available in a single container under (if needed) new labels.

The `Yarn`, as an even higher-order container, can only be initialized with one or more `Bus` or `Yarn`. A `Yarn` can even be created from multiple instances of the same `Bus` if each is given a unique `name`:

```
>>> sf.Yarn.from_buses((bus.rename('a'), bus.rename('b')), retain_labels=True)
<Yarn>
<IndexHierarchy>
a                f1    Frame
a                f2    Frame
b                f1    Frame
b                f2    Frame
<<U1>            <<U2> <object>

```

### Common & Distinguishing Characteristics[](#common-distinguishing-characteristics "Link to this heading")

A common characteristic shared by the `Bus`, `Batch`, and `Quilt` is that they all support instantiation from an iterator of pairs of labels and `Frames`. When that iterator is from a `Bus`, the lazy-loading of the `Bus` can be used to minimize memory overhead.

These containers all share the same file-based constructors, such as `from_zip_csv()` or `from_xlsx()`; each constructor has a corresponding exporter, e.g., `to_zip_csv()` or `to_xlsx()`, respectively, permitting round-trip reading and writing, or conversion from one format to another. The following table summarize the file-based constructors and exporters available on all three containers. (The `Yarn`, as an aggregation of `Bus`, only supports the exporters.)

| Constructor | Exporter |
| --- | --- |
| from\_hdf5 | to\_hdf5 |
| from\_sqlite | to\_sqlite |
| from\_zip\_csv | to\_zip\_csv |
| from\_zip\_npz | to\_zip\_npz |
| from\_zip\_pickle | to\_zip\_pickle |
| from\_zip\_parquet | to\_zip\_parquet |
| from\_zip\_tsv | to\_zip\_tsv |
| from\_xlsx | to\_xlsx |

These containers can be distinguished by dimensionality, shape, and interface. The `Bus` and `Yarn` are one-dimensional collections of `Frames`; the `Batch` and `Quilt` present two-dimensional `Frame`-like interfaces. While the shape of the `Bus` is equal to the number of `Frames` (or, for the `Yarn`, the number of `Frames` in all contained `Bus`), the shape of the `Quilt` depends on its contained `Frames` and its axis of orientation. Like a generator, the length (or shape) of a `Batch` is not known until iteration. Finally, while the `Bus` and `Yarn` expose a `Series`-like interface, the `Batch` and `Quilt` expose a `Frame`-like interface, operating on individual `Frames` or the virtually concatenated `Frame`, respectively.

As shown in the following table for m `Bus` of n `Frame` of `shape` (x, y), these containers populate a spectrum of dimensionality and interfaces.

|  | Bus | Batch | Quilt | Yarn |
| --- | --- | --- | --- | --- |
| Presented ndim | 1 | 2 | 2 | 1 |
| Approximate Interface | Series | Frame | Frame | Series |
| Composes | n Frame |  | 1 Bus/Yarn of n Frame | m Bus of n Frame |
| Presented shape | (n,) |  | (xn, y) or (x, yn) | (mn,) |

## Processing 7,163 DataFrames[](#processing-7-163-dataframes "Link to this heading")

The “Huge Stock Market Dataset” contains a collection of 7,163 CSV tables, each table a time series of characteristics for a US stock. The file “archive.zip” is available at <https://www.kaggle.com/borismarjanovic/price-volume-data-for-all-us-stocks-etfs>

After opening the archive, we can read from the contained “Stocks” directory and use a `Batch` to create a zip pickle of the stock data, labelled by ticker, for fast reading in subsequent examples. As some files are empty, we must also filter out files with no size. Depending on hardware, this initial transformation may take some time.

```
>>> import os
>>> d = 'archive/Stocks'
>>> fps = ((fn, os.path.join(d, fn)) for fn in os.listdir(d))
>>> items = ((fn.replace('.us.txt', ''), sf.Frame.from_csv(fp, index_depth=1)) for fn, fp in fps if os.path.getsize(fp))
>>> sf.Batch(items).to_zip_pickle('stocks.zip')

```

As the `Bus` is lazy, initialization from this new zip archive loads zero `Frames` into memory. Fast access to the data is provided only when explicitly requested. Thus, while the `Bus.shape` attribute shows 7,163 contained `Frames`, the `status` attribute shows zero loaded `Frames`.

```
>>> bus = sf.Bus.from_zip_pickle('stocks.zip')
>>> bus.shape
(7163,)
>>> bus.status['loaded'].sum()
0

```

Accessing a single `Frame` loads only that one `Frame`.

```
>>> bus['ibm'].shape
(14059, 6)
>>> bus['ibm'].columns
<Index>
Open
High
Low
Close
Volume
OpenInt
<<U7>

```

Extracting multiple `Frames` produces a new `Bus` that reads from the same store.

```
>>> bus[['aapl', 'msft', 'goog']]
<Bus>
<Index>
aapl    Frame
msft    Frame
goog    Frame
<<U9>   <object>
>>> bus.status['loaded'].sum()
4

```

With a `Batch` we can perform operations on the `Frames` contained in the `Bus`, returning labeled results. The `Batch.apply()` method can be used with a `lambda` to multiply two columns (“Volume” and “Close”) of each `Frame`; we then extract the most recent two values with `iloc` and produce a composite `Frame`, the index derived from the original `Bus` labels:

```
>>> sf.Batch(bus[['aapl', 'msft', 'goog']].items()).apply(lambda f: f['Close'] * f['Volume']).iloc[-2:].to_frame()
<Frame>
<Index> 2017-11-09         2017-11-10         <<U10>
<Index>
aapl    5175673321.5       4389543386.98
msft    1780638040.5600002 1626767764.8700001
goog    1283539710.3       740903319.18
<<U4>   <float64>          <float64>

```

To make observations across the entire dataset, we can pass the `Bus` to a `Quilt`. Below, a null slice is used to force loading all `Frames` at once to optimize `Quilt` performance. The shape shows a `Quilt` of almost 15 million rows.

```
>>> quilt = sf.Quilt(bus[:], retain_labels=True)
>>> quilt.shape
(14887665, 6)

```

Using the `Quilt` we can calculate the total volume of seven thousand securities on a single day without explicitly concatenating all `Frames`. The StaticFrame `HLoc` selector, used below, permits per-depth-level selection within a hierarchical index. Here we select all security records for 2017-11-10, across all tickers, and sum the volume.

```
>>> quilt.loc[sf.HLoc[:, '2017-11-10'], 'Volume'].sum()
5520175355

```

Similarly, the `iloc_max()` method can be used to find the ticker and date of the security with the highest volume across all securities. The ticker and date become the `name` attribute of the `Series` selected by `iloc_max()`.

```
>>> quilt.iloc[quilt['Volume'].iloc_max()]
<Series: ('bac', '2012-03-07')>
<Index>
Open                            7.4073
High                            7.6065
Low                             7.3694
Close                           7.6065
Volume                          2423735131.0
OpenInt                         0.0
<<U7>                           <float64>

```

## Cross-Container Comparisons: Same Method, Different Selections[](#cross-container-comparisons-same-method-different-selections "Link to this heading")

The previous examples demonstrated loading, processing, and examining the “Huge Stock Market Dataset” with the `Bus`, `Batch`, and `Quilt`. Cross-container comparisons can be used to further illustrate the characteristics of these containers. First, we can observe how three different selections are returned by applying the same method to each container. Second, we can observe how three approaches can be used with each container to return the same selection.

The `head(2)` method returns the first two rows (or elements) from any container. Understanding how the method’s output differs between the `Bus`, `Batch`, and `Quilt` helps illustrate their nature.

The `head(2)` method call on the `Bus` returns a new `Bus` consisting of the first two elements, i.e., the first two Frames in the “Huge Stock Market Dataset”.

```
>>> bus.head(2)
<Bus>
<Index>
fljh    Frame
bgt     Frame
<<U9>   <object>

```

As the `Batch` operates on each `Frame` in a `Bus`, calling `head(2)` extracts the top two rows from each `Frame` in the “Huge Stock Market Dataset.” Calling `to_frame()` concatenates these extractions into a new `Frame`, from which only two columns are then selected:

```
>>> sf.Batch(bus.items()).head(2).to_frame().shape
(14316, 6)
>>> sf.Batch(bus.items()).head(2).to_frame()[['Close', 'Volume']]
<Frame>
<Index>                     Close     Volume  <<U7>
<IndexHierarchy>
fljh             2017-11-07 26.189    1300
fljh             2017-11-08 26.3875   3600
bgt              2005-02-25 11.618    97637
bgt              2005-02-28 11.683    90037
angi             2011-11-21 15.4      469578
angi             2011-11-22 16.12     202970
ccj              2005-02-25 20.235    3830399
ccj              2005-02-28 19.501    3911079
uhs              2005-02-25 22.822    4700749
uhs              2005-02-28 23.056    1739084
eqfn             2015-07-09 8.68      489900
eqfn             2015-07-10 8.58      44100
ivfgc            2016-12-02 99.97     5005
ivfgc            2016-12-05 99.97     6002
achn             2006-10-25 11.5      0
achn             2006-10-26 12.39     361420
eurz             2015-08-19 24.75     200
...              ...        ...       ...
cai              2007-05-16 15.0      3960000
desc             2016-07-26 27.062    1015
desc             2016-07-27 27.15     193
swks             2005-02-25 7.0997    1838285
swks             2005-02-28 6.9653    2737207
hair             2017-10-12 9.92      2818561
hair             2017-10-13 9.6       294724
jnj              1970-01-02 0.5941    1468563
jnj              1970-01-05 0.5776    1185461
rosg             2011-08-05 181.8     183
rosg             2011-08-08 169.2     79
wbbw             2013-04-12 13.8      162747
wbbw             2013-04-15 13.67     126845
twow             2017-10-23 16.7      10045
twow             2017-10-24 16.682    850
gsjy             2016-03-07 25.238    14501
gsjy             2016-03-08 25.158    12457
<<U9>            <<U10>     <float64> <int64>

```

Finally, the `Quilt` represents the contained `Frames` as if they were a single, contiguous `Frame`. Calling `head(2)` returns the first two rows of that virtual `Frame`, labelled with a hierarchical index whose outer label is the `Frame`’s label (i.e., the ticker).

```
>>> quilt.head(2)[['Close', 'Volume']]
<Frame>
<Index>                     Close     Volume  <<U7>
<IndexHierarchy>
fljh             2017-11-07 26.189    1300
fljh             2017-11-08 26.3875   3600
<<U4>            <<U10>     <float64> <int64>

```

## Cross-Container Comparisons: Same Selections, Different Methods[](#cross-container-comparisons-same-selections-different-methods "Link to this heading")

Next, we will show how three approaches can be used with each container to return the same selection. While the `head()` method, used above, is a type of pre-configured selector, the full range of `loc` and `iloc` selection interfaces are supported by all containers. The following examples extract all “Open” and “Close” records from 1962-01-02.

To perform this selection with a `Bus`, we can iterate through each `Frame` and select the targeted records.

```
>>> for label, f in bus.items():
...     if '1962-01-02' in f.index:
...         print(f.loc['1962-01-02', ['Open', 'Close']].rename(label))
...
<Series: ge>
<Index>
Open         0.6277
Close        0.6201
<<U7>        <float64>
<Series: ibm>
<Index>
Open          6.413
Close         6.3378
<<U7>         <float64>

```

The `Batch` offers a more compact interface to achieve this selection than possible with the `Bus`. Without writing a loop, the `Batch.apply_except()` method can select row and column values from within each contained `Frame` while ignoring any `KeyErrors` raised from `Frames` without the selected date. Calling `to_frame()` concatenates the results together with their `Frame` labels.

```
>>> sf.Batch(bus.items()).apply_except(lambda f: f.loc['1962-01-02', ['Open', 'Close']], KeyError).to_frame()
<Frame>
<Index> Open      Close     <<U7>
<Index>
ge      0.6277    0.6201
ibm     6.413     6.3378
<<U3>   <float64> <float64>

```

Finally, as a virtual concatenation of `Frames`, the `Quilt` permits selection as if from a single `Frame`. As shown below, a hierarchical selection on the inner label “1962-01-02” brings together any records for that date across all tickers.

```
>>> quilt.loc[sf.HLoc[:, '1962-01-02'], ['Open', 'Close']]
<Frame>
<Index>                     Open      Close     <<U7>
<IndexHierarchy>
ge               1962-01-02 0.6277    0.6201
ibm              1962-01-02 6.413     6.3378
<<U3>            <<U10>     <float64> <float64>

```

## Minimizing Memory Usage[](#minimizing-memory-usage "Link to this heading")

In previous examples, the `Bus` was shown to lazily load data as it was accessed. While this permits only loading what is needed, strong references to loaded `Frames` are retained in the `Bus`, keeping them in memory. For large collections of data this can result in undesirable data retention.

By using the `max_persist` argument on `Bus` initialization, we can fix the maximum number of `Frames` retained in the `Bus`. As shown below, by setting `max_persist` to one, after loading each `Frame`, the number of loaded `Frames` remains one:

```
>>> bus = sf.Bus.from_zip_pickle('stocks.zip', max_persist=1)
>>> bus['aapl'].shape
(8364, 6)
>>> bus.status['loaded'].sum()
1
>>> bus['ibm'].shape
(14059, 6)
>>> bus.status['loaded'].sum()
1
>>> bus['goog'].shape
(916, 6)
>>> bus.status['loaded'].sum()
1

```

With this configuration, a process could iterate through all 7,163 `Frames`, doing work on each `Frame`, but only incurring the memory overhead of a single `Frame`. While the same routine could be performed with a group-by on a single `Frame`, this approach explicitly favors minimizing memory usage over compute time. The example below demonstrates such an approach, finding the maximum span between close quotes per stock across all stocks.

```
>>> max_span = 0
>>> for label in bus.index:
...     max_span = max(bus[label]['Close'].max() - bus[label]['Close'].min(), max_span)
...
>>> max_span
1437986239.4042
>>> bus.status['loaded'].sum()
1

```

As a `Bus` can be provided as input to a `Batch`, `Quilt`, and `Yarn`, the entire family of containers can benefit from this approach to reducing memory overhead.

## Parallel Processing[](#parallel-processing "Link to this heading")

Independently processing large numbers of `Frames` is an embarrassingly parallel problem. As such, these higher-order containers provide opportunities for parallel processing.

All constructors and exporters of zipped archives, such as `from_zip_parquet()` or `to_zip_npz()`, support a `config` argument that permits specifying, within a `StoreConfig` instance, numbers of workers and chunksize for multiprocessing `Frame` deserialization or serialization. The relevant parameters of the `StoreConfig` are `read_max_workers`, `read_chunksize`, `write_max_workers`, and `write_chunksize`.

Similarly, all `Batch` constructors expose `max_workers`, `chunk_size`, and `use_threads` parameters to permit processing `Frames` in parallel. Simply by enabling these parameters, operations on vast numbers of `Frames` can be multi-processed or multi-threaded, potentially delivering significant performance improvements. While using threads for CPU-bound processing is generally inefficient in Python, some NumPy-based operations (outside the global interpreter lock) executed with thread pools can out-perform process pools.

## Conclusion[](#conclusion "Link to this heading")

While related tools for working with collections of `Frames` exist, the `Bus`, `Batch`, `Quilt`, and `Yarn` provide well-defined abstractions that cover common needs in working with potentially huge collections of tables. Combined with lazy loading, eager unloading, and lazy execution, as well as support for a variety of multi-table storage formats, these tools provide valuable resources for DataFrame processing.

[Previous](hash.md "Memoizing DataFrame Functions: Using Hashable DataFrames and Message Digests to Optimize Repeated Calculations")
[Next](fill_value.md "One Fill Value Is Not Enough: Preserving Columnar Types When Reindexing DataFrames")

---

© Copyright 2025, Christopher Ariza.
Last updated on May 17, 2025.

Built with [Sphinx](https://www.sphinx-doc.org/) using a
[theme](https://github.com/readthedocs/sphinx_rtd_theme)
provided by [Read the Docs](https://readthedocs.org).