[![Logo](../_static/sf-logo-web_icon-small.png)](../index.md)

Quick Start

* [static-frame](../readme.md)
* [License](../license.md)

Introduction

* [About StaticFrame](../intro.md)
* [Media](../intro.html#media)
* [What is New in StaticFrame](../new.md)
* [Contributing](../contributing.md)

Articles

* [Improving Code Quality with Array and DataFrame Type Hints](guard.md)
* [Type-Hinting DataFrames for Static Analysis and Runtime Validation](ftyping.md)
* [Faster DataFrame Serialization](serialize.md)
* [The Performance Advantage of No-Copy DataFrame Operations](no_copy.md)
* [Memoizing DataFrame Functions: Using Hashable DataFrames and Message Digests to Optimize Repeated Calculations](hash.md)
* [Using Higher-Order Containers to Efficiently Process 7,163 (or More) DataFrames](uhoc.md)
* [One Fill Value Is Not Enough: Preserving Columnar Types When Reindexing DataFrames](fill_value.md)
* [Ten Reasons to Use StaticFrame Instead of Pandas](upgrade.md)
* Boring Indices & Where to Find Them: The Auto-Incremented Integer Index in StaticFrame
  + [Reindexing & Relabeling](#reindexing-relabeling)
  + [Setting an Auto-Incremented Integer Index](#setting-an-auto-incremented-integer-index)
  + [The `IndexAutoFactory` Type](#the-indexautofactory-type)
  + [Resetting an Index when Relabeling](#resetting-an-index-when-relabeling)
  + [Resetting an Index when Concatenating](#resetting-an-index-when-concatenating)
  + [Consistent Interfaces for More Maintainable Code](#consistent-interfaces-for-more-maintainable-code)

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

* Boring Indices & Where to Find Them: The Auto-Incremented Integer Index in StaticFrame
* [View page source](../_sources/articles/aiii.rst.txt)

[Previous](upgrade.html "Ten Reasons to Use StaticFrame Instead of Pandas")
[Next](../api_overview/series.html "Overview: Series")

---

# Boring Indices & Where to Find Them: The Auto-Incremented Integer Index in StaticFrame[](#boring-indices-where-to-find-them-the-auto-incremented-integer-index-in-staticframe "Link to this heading")

This article demonstrates how StaticFrame exposes functionality for creating the most boring index object: the auto-incremented integer index (AIII). An AIII makes an axis selectable with integers, just as a NumPy array; it makes `loc` selection mostly equivalent to `iloc` selection; and it is closely related to “auto increment” integer columns found in databases, such as in MySQL (the `AUTO_INCREMENT` keyword), SQLite (the `AUTOINCREMENT` keyword), or PostgreSQL (the `SERIAL` pseudo-type).

While index objects that provide scrutable labels into data are a key feature of libraries like Pandas and StaticFrame, there are many situations where the simple, inscrutable AIII is needed, such as when data does not have a meaningful index, or in concatenation of data with redundant indices. Offering convenient and consistent approaches to creating these indices supports creating more maintainable code.

All examples use StaticFrame 0.4.0 or later and import with the following convention:

```
>>> import static_frame as sf

```

## Reindexing & Relabeling[](#reindexing-relabeling "Link to this heading")

We will take a brief detour to consider how reindexing and relabeling work in Pandas and StaticFrame.

Changing an index on a `Series` or `Frame` could be done in at least two ways: (1) create a new container with a new index of any size, supplying labels with values from the old container if those labels are in the old index (i.e., alignment based on index labels) or (2) create a new container with a new index of the same size, reusing the same values in the same position (alignment based on position).

Following the precedent of Pandas, StaticFrame implements `Series.reindex()` and `Frame.reindex()` with the former interpretation: alignment based on index labels. As shown in the example below, the new index only matches and retains two of the four previous values:

```
>>> s1 = sf.Series((x * 100 for x in range(1, 5)), index=tuple('wxyz'))
>>> s1
<Series>
<Index>
w        100
x        200
y        300
z        400
<<U1>    <int64>

>>> s1.reindex(tuple('stwx'), fill_value=0)
<Series>
<Index>
s        0
t        0
w        100
x        200
<<U1>    <int64>

```

To handle the latter interpretation, alignment based on position, Pandas offers at least two approaches: the mutable `index` attribute can be directly assigned, or the `set_axis()` function can be used.

StaticFrame names all methods “relabel” that supply a new or transformed index of the same size, to be aligned by position. The `Series.relabel()` method can be used to create a new index by transforming old index labels (via a function or mapping), or by supplying an appropriately sized index initializer. As NumPy arrays in StaticFrame are immutable, relabeling is efficient: underlying data is never copied.

```
>>> s1.relabel(tuple('abcd'))
<Series>
<Index>
a        100
b        200
c        300
d        400
<<U1>    <int64>

```

## Setting an Auto-Incremented Integer Index[](#setting-an-auto-incremented-integer-index "Link to this heading")

A common use of index assignment based on position is “resetting” the index: replacing an existing index with an auto-incremented integer index (AIII). AIIIs are given to `Series` and `Frame` created without explicit index arguments; they are also useful when combining data that does not have a “natural” index along an axis.

While Pandas offers a discrete method for this operation, `reset_index()`, that function is made complex due to the `drop` and `inplace` parameters. For example, `reset_index()` will produce, from a `pd.Series`, a new `pd.Series` or a `pd.Frame` depending on if `drop` is `True` or `False`, and exposes a conflicting parameter configuration if `drop` is `False` and `inplace` is `True`, raising “TypeError: Cannot reset\_index inplace on a Series to create a DataFrame.”

A goal in StaticFrame’s API design is to avoid, as much as possible, interfaces that permit conflicting, non-orthogonal arguments.

In addition to relabeling, another case where an AIII is frequently needed is in concatenating numerous `Series` or `Frame`. For example, when concatenating a `Frame`, one axis might be aligned while the other, extended axis requires an AIII. Deviating in naming from of the `reset_index()` method, Pandas supports this with a Boolean `ignore_index` parameter provided to the `pd.concat()` function.

Another goal of StaticFrame’s API design is to support common interfaces wherever possible. Reusing, across diverse interfaces, the same mechanism for creating AIIIs is desirable.

## The `IndexAutoFactory` Type[](#the-indexautofactory-type "Link to this heading")

Rather than specialized functions or arguments, AIIIs in StaticFrame can be created on `Series` or `Frame` by passing a special value, an `IndexAutoFactory` object, to index initializer arguments. This is presently supported for `Series.relabel()`, `Frame.relabel()`, `Series.from_concat()`, and `Frame.from_concat()`. `Series` and `Frame` initializers similarly can take an `IndexAutoFactory`.

By using a special type that can be supplied to existing `index` or `columns` arguments, StaticFrame avoids non-orthogonal arguments and offers a consistent interface for producing AIIIs.

## Resetting an Index when Relabeling[](#resetting-an-index-when-relabeling "Link to this heading")

By accepting an `IndexAutoFactory` argument, a `relabel()` method can be used to cover the functionality of the Pandas `reset_index()` method.

For example, the `IndexAutoFactory` class can be given as the `index` argument to `Series.relabel()` to produce a new `Series` with an AIII. As mentioned above, as underlying NumPy arrays are immutable in StaticFrame, this is a no-copy operation.

```
>>> s1.relabel(sf.IndexAutoFactory)
<Series>
<Index>
0        100
1        200
2        300
3        400
<int64>  <int64>

```

The benefit of having a specific type, rather than using `None`, to signify application of an AIII is made more clear in the context of `Frame.relabel()`, where both a `columns` and `index` argument can be set independently. The example bellow demonstrates creating a `Frame`, setting an AIII on both axis, and setting an AIII on `columns` while doing relabeling on the `index`.

```
>>> f1 = sf.Frame.from_dict(dict(a=(1,2), b=(True, False)), index=tuple('xy'))
>>> f1
<Frame>
<Index> a       b      <<U1>
<Index>
x       1       True
y       2       False
<<U1>   <int64> <bool>

>>> f1.relabel(index=sf.IndexAutoFactory, columns=sf.IndexAutoFactory)
<Frame>
<Index> 0       1      <int64>
<Index>
0       1       True
1       2       False
<int64> <int64> <bool>

>>> f1.relabel(index=tuple('ab'), columns=sf.IndexAutoFactory)
<Frame>
<Index> 0       1      <int64>
<Index>
a       1       True
b       2       False
<<U1>   <int64> <bool>

```

## Resetting an Index when Concatenating[](#resetting-an-index-when-concatenating "Link to this heading")

Concatinating `Series` and `Frame` is a context where supplying a new index is often desirable along the extended axis. The `IndexAutoFactory` type can be used here to supply that index.

For example, when concatenating (vertically stacking) with `Series.from_concat()`, we must supply a new index if the resulting index is not unique. Unlike Pandas, StaticFrame requires all indices to have unique values.

```
>>> s1
<Series>
<Index>
w        100
x        200
y        300
z        400
<<U1>    <int64>

>>> sf.Series.from_concat((s1, s1), index=tuple('abcdefgh'))
<Series>
<Index>
a        100
b        200
c        300
d        400
e        100
f        200
g        300
h        400
<<U1>    <int64>

```

If an AIII is needed, the `IndexAutoFactory` type can be used with the same interface:

```
>>> sf.Series.from_concat((s1, s1), index=sf.IndexAutoFactory)
<Series>
<Index>
0        100
1        200
2        300
3        400
4        100
5        200
6        300
7        400
<int64>  <int64>

```

The same approach is used with `Frame.from_concat()`, where both `columns` and `index` arguments are exposed. For example, two `Series` can be horizontally “stacked” along axis 1 to produce a new `Frame`. If the `Series.name` attributes are unique, they can be used to create the columns; otherwise, new columns can be supplied or an `IndexAutoFactory` value can be provided.

```
>>> s2 = s1 * .5
>>> sf.Frame.from_concat((s1, s2), axis=1, columns=sf.IndexAutoFactory)
<Frame>
<Index> 0       1         <int64>
<Index>
w       100     50.0
x       200     100.0
y       300     150.0
z       400     200.0
<<U1>   <int64> <float64>

```

Similarly, concatenating along axis 1 (horizontally stacking) the same `Frame` multiple times results in non-unique columns, which raises an `Exception` in StaticFrame. To avoid this, the `IndexAutoFactory` can be supplied.

```
>>> sf.Frame.from_concat((f1, f1), axis=1, columns=sf.IndexAutoFactory)
<Frame>
<Index> 0       1      2       3      <int64>
<Index>
x       1       True   1       True
y       2       False  2       False
<<U1>   <int64> <bool> <int64> <bool>

```

## Consistent Interfaces for More Maintainable Code[](#consistent-interfaces-for-more-maintainable-code "Link to this heading")

Resetting an index is not a complex operation. However, how to provide the option to create an AIII within diverse interfaces is not obvious. The approach taken with StaticFrame offers a consistent interface, leading to more maintainable code.

For more information about StaticFrame, see the documentation (<http://static-frame.readthedocs.io>) or project site (<https://github.com/static-frame/static-frame>).

[Previous](upgrade.html "Ten Reasons to Use StaticFrame Instead of Pandas")
[Next](../api_overview/series.html "Overview: Series")

---

© Copyright 2025, Christopher Ariza.
Last updated on Apr 29, 2025.

Built with [Sphinx](https://www.sphinx-doc.org/) using a
[theme](https://github.com/readthedocs/sphinx_rtd_theme)
provided by [Read the Docs](https://readthedocs.org).