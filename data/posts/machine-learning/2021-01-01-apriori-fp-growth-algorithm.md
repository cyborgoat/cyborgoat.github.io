---
title: "Apriori & FP-Growth: Uncovering Patterns in Your Data"
date: '2021-01-01'
author: Cyborgoat
authorImage: 'https://avatars.githubusercontent.com/u/44262838?v=4&size=64'
tags:
  - Machine Learning
  - Data Mining
  - Association Rules
  - Apriori
  - FP-Growth
excerpt: "Explore Apriori and FP-Growth algorithms for association rule mining, understand key concepts like Support, Confidence, and Lift, and see a Python example with mlxtend."
thumbnail: "/images/posts/association_rules/market_basket_analysis.png" # Suggested new thumbnail
---

Have you ever noticed how supermarkets cleverly place certain items together? For instance, bread and butter are often nearby, or chips and salsa are in the same aisle. This isn't accidental! Stores analyze customer buying habits to uncover these patterns. If many customers buy items X and Y together, the store might:

1. Place X and Y on the same shelf for convenience.
2. Offer discounts if X and Y are bought together to boost sales.
3. Target ads for Y to customers who frequently buy X.

This powerful technique of finding relationships between items in large datasets is called **Association Rule Mining**. Let's dive into how it works.

## Key Concepts in Association Rule Analysis

To measure how strongly items are associated, we use a few key metrics:

### 1. Support

Support tells us the popularity of an item or a set of items (itemset). It's the proportion of transactions in your dataset that contain that itemset.

**Formula:**

```
Support(Itemset) = (Number of transactions containing Itemset) / (Total number of transactions)
```

**Example:**
Imagine a supermarket with 1000 transactions.

* If "Bread" appears in 300 transactions, `Support(Bread) = 300/1000 = 0.3` (or 30%).
* If the itemset {"Bread", "Butter"} appears in 150 transactions, `Support({Bread, Butter}) = 150/1000 = 0.15` (or 15%).

A higher support value means the itemset is more frequent.

### 2. Confidence

Confidence measures the likelihood of item Y being purchased when item X is already purchased. It indicates the reliability of an association rule `X -> Y` (If X, then Y).

**Formula:**

```
Confidence(X -> Y) = Support({X, Y}) / Support(X)
```

This can also be seen as the conditional probability `P(Y|X)`.

**Example:**
Using our supermarket data:

* `Support({Bread, Butter}) = 0.15`
* `Support(Bread) = 0.3`
* `Confidence(Bread -> Butter) = 0.15 / 0.3 = 0.5` (or 50%).
This means 50% of the customers who bought Bread also bought Butter.

**Important Note:** Confidence can be misleading. If item Y is very popular overall, `Confidence(X -> Y)` might be high even if there's no strong association between X and Y. This is where Lift comes in.

### 3. Lift

Lift measures how much more likely item Y is to be purchased when item X is purchased, while accounting for the overall popularity of Y. It tells us if the association rule `X -> Y` is genuinely strong or just a coincidence due to Y's high individual support.

**Formula:**

```
Lift(X -> Y) = Confidence(X -> Y) / Support(Y)
             = Support({X, Y}) / (Support(X) * Support(Y))
```

**Interpretation:**

* **Lift = 1:** X and Y are independent; purchasing X doesn't affect the likelihood of purchasing Y.
* **Lift > 1:** X and Y are positively associated; purchasing X increases the likelihood of purchasing Y. The higher the lift, the stronger the association.
* **Lift < 1:** X and Y are negatively associated (substitutes); purchasing X decreases the likelihood of purchasing Y.

**Example:**
Continuing with Bread and Butter:

* `Confidence(Bread -> Butter) = 0.5`
* Let's say `Support(Butter) = 0.2` (Butter appears in 20% of all transactions).
* `Lift(Bread -> Butter) = 0.5 / 0.2 = 2.5`.
Since Lift (2.5) > 1, this suggests a strong positive association: customers are 2.5 times more likely to buy Butter if they've bought Bread, compared to the general likelihood of buying Butter.

## Apriori Algorithm

The Apriori algorithm is a classic method for mining frequent itemsets and then generating association rules. Its core idea is based on the **Apriori principle**:

> If an itemset is frequent, then all of its subsets must also be frequent.
> Conversely, if an itemset is infrequent, then all of its supersets must also be infrequent.

This principle allows the algorithm to efficiently prune the search space for frequent itemsets.

**How Apriori Works (High-Level Steps):**

1. **Set a Minimum Support Threshold (min_sup)**: This is a user-defined value (e.g., 0.1 or 10%). Itemsets with support below this threshold are considered infrequent. The choice of `min_sup` often depends on domain knowledge and the dataset size.
2. **Generate Frequent 1-Itemsets (L1)**: Scan the transaction database to find all individual items that meet `min_sup`.
3. **Iterative Generation of Frequent k-Itemsets (Lk)**:
    * **Join Step**: Generate candidate (k)-itemsets (Ck) by joining frequent (k-1)-itemsets (Lk-1) from the previous step. For example, join L2 itemsets `{A, B}` and `{A, C}` to form a candidate C3 itemset `{A, B, C}`.
    * **Prune Step**: Remove candidate itemsets from Ck if any oftheir (k-1)-subsets are not in Lk-1 (this applies the Apriori principle).
    * **Support Counting**: Scan the database again to count the support of the remaining candidates in Ck.
    * **Filter**: Keep only those candidate itemsets in Ck that meet `min_sup`. These form Lk.
4. **Repeat Step 3** until no more frequent k-itemsets can be found.
5. **Generate Association Rules**: From the final set of frequent itemsets, generate association rules that meet a **minimum confidence threshold (min_conf)**. For every frequent itemset `I`, find all non-empty subsets `S`. For each such subset, generate a rule `S -> (I-S)` if `Support(I) / Support(S) >= min_conf`.

<img src="/images/posts/association_rules/aprior_steps.png" alt="Flowchart of the Apriori algorithm showing candidate generation and pruning steps." />

### Limitations of Apriori

While effective, Apriori has some drawbacks:

* **Multiple Database Scans**: It may require scanning the database multiple times (once for each k-itemset level), which can be slow for large datasets.
* **Large Number of Candidates**: It can generate a huge number of candidate itemsets, especially with low `min_sup` values or many items.

## FP-Growth Algorithm

The FP-Growth (Frequent Pattern Growth) algorithm offers a more efficient alternative to Apriori by avoiding explicit candidate generation. It uses a compact tree-like data structure called an **FP-Tree** to store frequent item information.

**How FP-Growth Works (High-Level Steps):**

1. **First Database Scan**:
    * Scan the transaction database once to find the support for each individual item.
    * Discard infrequent items (those below `min_sup`).
    * Sort the frequent items in descending order of their support. This sorted list is often called the "header table" or "F-list".
2. **FP-Tree Construction (Second Database Scan)**:
    * Create the root of the FP-Tree (labeled "null").
    * For each transaction in the database:
        * Select only the frequent items from the transaction and sort them according to the F-list order.
        * Insert this sorted, frequent transaction into the FP-Tree. If a path for the items already exists, increment the count of the shared nodes. If not, create new nodes.
        * Nodes in the FP-Tree store the item name and its count. Links connect items within a transaction, and a "node-link" structure connects all nodes for the same item (facilitating traversal).
3. **Mining Frequent Patterns from the FP-Tree**:
    * This is the recursive part. Start from the least frequent item in the F-list.
    * For each item, find its **conditional pattern base**: the set of paths (prefixes) in the FP-Tree that end with this item.
    * Construct a **conditional FP-Tree** from these conditional pattern bases.
    * Recursively mine the conditional FP-Tree.
    * The frequent patterns are generated by combining the item with the patterns found in its conditional FP-Tree.

The FP-Growth algorithm typically requires only two scans of the database, making it significantly faster than Apriori for many datasets.

<img src="/images/posts/association_rules/fp_tree_construction_and_mining_process.png" alt="Diagram illustrating FP-Tree construction and mining process." />

## Python Example with `mlxtend`

Let's see a practical example using the `mlxtend` library in Python, which provides efficient implementations of Apriori and FP-Growth.

First, you'll need to install `mlxtend`:

```bash
pip install mlxtend
```

Now, let's apply it to a sample dataset:

```python
import pandas as pd
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, fpgrowth
from mlxtend.frequent_patterns import association_rules

# Sample transaction data
dataset = [['Milk', 'Onion', 'Nutmeg', 'Kidney Beans', 'Eggs', 'Yogurt'],
           ['Dill', 'Onion', 'Nutmeg', 'Kidney Beans', 'Eggs', 'Yogurt'],
           ['Milk', 'Apple', 'Kidney Beans', 'Eggs'],
           ['Milk', 'Unicorn', 'Corn', 'Kidney Beans', 'Yogurt'],
           ['Corn', 'Onion', 'Onion', 'Kidney Beans', 'Ice cream', 'Eggs']]

# Transform the data into a one-hot encoded DataFrame
te = TransactionEncoder()
te_ary = te.fit(dataset).transform(dataset)
df = pd.DataFrame(te_ary, columns=te.columns_)

print("One-hot encoded transactions:")
print(df)

# Find frequent itemsets using Apriori (can also use fpgrowth)
# Let's set minimum support to 0.5 (50%)
frequent_itemsets_apriori = apriori(df, min_support=0.5, use_colnames=True)
print("\nFrequent itemsets (Apriori) with min_support=0.5:")
print(frequent_itemsets_apriori)

# Find frequent itemsets using FP-Growth
frequent_itemsets_fpgrowth = fpgrowth(df, min_support=0.5, use_colnames=True)
print("\nFrequent itemsets (FP-Growth) with min_support=0.5:")
print(frequent_itemsets_fpgrowth)

# Generate association rules
# Let's use a minimum confidence threshold of 0.7 (70%)
rules_apriori = association_rules(frequent_itemsets_apriori, metric="confidence", min_threshold=0.7)
print("\nAssociation rules (from Apriori's frequent itemsets) with min_confidence=0.7:")
print(rules_apriori[['antecedents', 'consequents', 'support', 'confidence', 'lift']])

rules_fpgrowth = association_rules(frequent_itemsets_fpgrowth, metric="confidence", min_threshold=0.7)
print("\nAssociation rules (from FP-Growth's frequent itemsets) with min_confidence=0.7:")
print(rules_fpgrowth[['antecedents', 'consequents', 'support', 'confidence', 'lift']])

# You can also filter rules, for example, by lift
# print("\nRules with Lift > 1.2:")
# print(rules_fpgrowth[rules_fpgrowth['lift'] > 1.2])
```

**Explanation of the Code:**

1. **Dataset**: We define a sample list of transactions.
2. **TransactionEncoder**: This utility from `mlxtend` converts the list of transactions into a one-hot encoded pandas DataFrame. Each column represents an item, and each row represents a transaction. A `True` or `1` indicates the item is in the transaction, `False` or `0` otherwise. This is the format required by `mlxtend`'s functions.
3. **`apriori()` / `fpgrowth()`**: These functions take the one-hot DataFrame and a `min_support` threshold to find all frequent itemsets. `use_colnames=True` makes the output readable by showing item names instead of column indices.
4. **`association_rules()`**: This function takes the frequent itemsets and a metric (e.g., "confidence", "lift") with a `min_threshold` to generate the actual association rules.

This example shows how easily you can apply these powerful algorithms to discover interesting patterns in your data!

## Conclusion

Apriori and FP-Growth are fundamental algorithms in data mining for discovering hidden associations in transactional data. Understanding concepts like support, confidence, and lift is crucial for interpreting the strength and relevance of these associations. While Apriori is a foundational algorithm, FP-Growth often provides a more scalable solution for larger datasets. With tools like `mlxtend`, implementing these algorithms has become more accessible, enabling businesses and researchers to unlock valuable insights from their data.
